// // const { sendTransaction } = require("../utils/web3");
// const Rental = require("../models/Rental");
// const sendTransaction = require("../utils/sendTransaction"); // Use mock version for now
// const otpGenerator = require("otp-generator");
// const multer = require("multer");
// const path = require("path");
// const jwt = require("jsonwebtoken");
// // const otpGenerator = require("otp-generator");
// const sendOTPEmail = require("../config/emailConfig");


// // 📌 Create Listing
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Save images in the "uploads" folder
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
//   },
// });

// // Multer middleware for handling image upload
// const upload = multer({ storage: storage }).single("image");
// // const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;

// exports.createListing = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ msg: "Image upload failed", error: err.message });
//     }

//     try {
//       const { owner, rentAmount, deposit, description } = req.body;

//       if (!req.file) {
//         return res.status(400).json({ msg: "Image is required" });
//       }

//       const imageUrl = `/uploads/${req.file.filename}`; // Path to stored image

//       const newListing = new Rental({
//         owner,
//         rentAmount,
//         deposit,
//         description, // Store product description
//         imageUrl, // Store image path
//         status: "Created",
//       });

//       await newListing.save();

//       res.status(201).json({ msg: "Listing created successfully", listing: newListing });
//     } catch (error) {
//       res.status(500).json({ msg: "Server error", error: error.message });
//     }
//   });
// };

// //📌 Book Rental


// exports.bookRental = async (req, res) => {
//   try {
//     const { rentalId, rentAmount, deposit, ownerPrivateKey } = req.body;

//     // Extract JWT token and decode user email
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ msg: "Unauthorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     const renter = decoded.userId; // Assuming renter's ID is in the token
//     const renterEmail = decoded.email; // Get email from token

//     // Generate OTP
//     const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

//     // Find rental item
//     const rental = await Rental.findById(rentalId);
//     if (!rental) return res.status(404).json({ msg: "Rental not found" });

//     // Send OTP to user's email
//     await sendOTPEmail(req.user.email, otp);

//     // Call blockchain smart contract function
//     const receipt = await sendTransaction(
//       "rentItem",
//       [renter, otp],
//       rental.owner,
//       ownerPrivateKey,
//       (deposit + rentAmount).toString()
//     );

//     // Store rental details & OTP (for verification later)
//     rental.renter = renter;
//     rental.otp = otp;
//     rental.status = "Rented";
//     await rental.save();

//     res.status(200).json({ 
//       msg: "Rental booked successfully. OTP sent to registered email.",
//       rental, 
//       transactionHash: receipt.transactionHash 
//     });

//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// // exports.bookRental = async (req, res) => {
// //   try {
// //     const { rentalId, renter, rentAmount, deposit, ownerPrivateKey } = req.body;
// //     const otp = OTPGenerator.generate(6, { digits: true });

// //     const rental = await Rental.findById(rentalId);
// //     if (!rental) return res.status(404).json({ msg: "Rental not found" });

// //     const receipt = await sendTransaction(
// //       "rentItem",
// //       [renter, otp],
// //       rental.owner,
// //       ownerPrivateKey,
// //       (deposit + rentAmount).toString()
// //     );

// //     rental.renter = renter;
// //     rental.otp = otp;
// //     rental.status = "Rented";
// //     await rental.save();

// //     res.status(200).json({ msg: "Rental booked successfully", rental, transactionHash: receipt.transactionHash });
// //   } catch (error) {
// //     res.status(500).json({ msg: "Server error", error: error.message });
// //   }
// // };

// // // 📌 Confirm Return
// // exports.confirmReturn = async (req, res) => {
// //   try {
// //     const { rentalId, renter, otpInput, renterPrivateKey } = req.body;

// //     const rental = await Rental.findById(rentalId);
// //     if (!rental) return res.status(404).json({ msg: "Rental not found" });

// //     const receipt = await sendTransaction(
// //       "confirmReturn",
// //       [otpInput],
// //       renter,
// //       renterPrivateKey
// //     );

// //     rental.status = "Completed";
// //     await rental.save();

// //     res.status(200).json({ msg: "Rental return confirmed", rental, transactionHash: receipt.transactionHash });
// //   } catch (error) {
// //     res.status(500).json({ msg: "Server error", error: error.message });
// //   }
// // };


const { AptosClient, AptosAccount } = require("aptos");
const Rental = require("../models/Rental");
const sendOTPEmail = require("../config/emailConfig");
const otpGenerator = require("otp-generator");
// require("dotenv").config();
require("dotenv").config({ path: "./.env" });
const sendTransaction  = require("../utils/sendTransaction"); // ✅ Import sendTransaction
const jwt = require("jsonwebtoken");

const multer = require("multer");
const path = require("path");

// ✅ Load Private Key & Aptos Node URL from .env
const APTOS_NODE_URL = process.env.APTOS_NODE_URL;

const client = new AptosClient(APTOS_NODE_URL);

// 📌 Multer Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save images in the "uploads" folder
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  },
});

// Multer middleware for handling image upload
const upload = multer({ storage: storage }).single("image");

// 📌 Create Listing with Blockchain & Image Upload
exports.createListing = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: "Image upload failed", error: err.message });
    }

    try {
      const { owner, rentAmount, deposit, description } = req.body;
      const OWNER_PRIVATE_KEY = process.env.OWNER_PRIVATE_KEY;

      if (!OWNER_PRIVATE_KEY) {
        return res.status(500).json({ msg: "Server error", error: "Private key missing in .env" });
      }

      if (!req.file) {
        return res.status(400).json({ msg: "Image is required" });
      }
      const imageUrl = `/uploads/${req.file.filename}`; // Path to stored image
// Check if renterAddress is valid (Aptos format)
if (!owner || !owner.startsWith('0x') || owner.length !== 66) {
  return res.status(400).json({ msg: "Invalid Aptos renter address" });
}

      // Send transaction to blockchain
      let receipt = null;
      try {
        const receipt = await sendTransaction("create_rental", [rentAmount, deposit]);
        console.log("Blockchain Response:", receipt);
         res.status(201).json({ msg: "Transaction successful", receipt });
      } catch (error) {
        console.error("Blockchain Error:", error);
        res.status(500).json({ msg: "Blockchain error", error: error.message });
      }
      
      // const receipt = await sendTransaction("create_rental", [rentAmount, deposit]);
      // if (!receipt || !receipt.txHash) {
      //   return res.status(500).json({ msg: "Blockchain transaction failed" });
      // }
      // console.log("Blockchain Transaction Response:", receipt);
      // Save listing in MongoDB
      const newListing = new Rental({
        owner,
        rentAmount,
        deposit,
        description,
        imageUrl,
        status: "Created",
        transactionHash: receipt, // ✅ Store transaction hash correctly
      });
      await newListing.save();

      // res.status(201).json({ msg: "Listing created successfully", listing: newListing });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  });
};

// ✅ Book Rental (MongoDB + Blockchain)
exports.bookRental = async (req, res) => {
  try {
    const { rentalId } = req.body;

    // Verify renter identity from JWT
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // const renter = decoded.userId;
    const renterAddress = req.user.address;
    const renterEmail = decoded.email;

    // Find rental
    const rental = await Rental.findById(rentalId);
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    // Generate OTP and send email
    const otp = otpGenerator.generate(6, { digits: true });
    await sendOTPEmail(req.user.email, otp);

    // Call blockchain smart contract
    const txnHash = await sendTransaction("create_rental", [ rental.rentAmount, rental.deposit]);

    // Update MongoDB
    
    rental.otp = otp;
    rental.status = "Rented";
    await rental.save();

    res.status(200).json({ msg: "Rental booked successfully. OTP sent.", rental, transactionHash: txnHash });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

exports.completeRental = async (req, res) => {
  try {
    const { rentalId } = req.body;

    // Find rental by ID
    const rental = await Rental.findById(rentalId);
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    // Update rental status to 'Completed' in MongoDB
    rental.status = "Completed";
    await rental.save();

    res.status(200).json({ msg: "Rental completed successfully", rental });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// // ✅ Complete Rental & Refund (Blockchain + MongoDB)
// exports.completeRental = async (req, res) => {
//   try {
//     const { rentalId } = req.body;

//     // Find rental
//     const rental = await Rental.findById(rentalId);
//     if (!rental) return res.status(404).json({ msg: "Rental not found" });

//     // Call blockchain function to complete rental
//     const txnHash = await sendTransaction("complete_rental", [rental.renter]);

//     // Update MongoDB
//     rental.status = "Completed";
//     await rental.save();

//     res.status(200).json({ msg: "Rental completed successfully", rental, transactionHash: txnHash });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// ✅ Cancel Rental (Blockchain + MongoDB)
exports.cancelRental = async (req, res) => {
  try {
    const { rentalId } = req.body;

    // Find rental
    const rental = await Rental.findById(rentalId);
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    // Call blockchain function to cancel rental
    // const txnHash = await sendTransaction("cancel_rental", [rental.renter]);

    // Update MongoDB
    rental.status = "Canceled";
    await rental.save();

    res.status(200).json({ msg: "Rental cancelled successfully", rental});
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// ✅ Add Penalty (Blockchain + MongoDB)
exports.addPenalty = async (req, res) => {
  try {
    const { rentalId, penaltyAmount } = req.body;

    // Find rental
    const rental = await Rental.findById(rentalId);
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    // Call blockchain function to add penalty
    const txnHash = await sendTransaction("add_penalty", [ penaltyAmount]);

    // Update MongoDB
    rental.penalties += penaltyAmount;
    await rental.save();

    res.status(200).json({ msg: "Penalty added successfully", rental, transactionHash: txnHash });
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};
