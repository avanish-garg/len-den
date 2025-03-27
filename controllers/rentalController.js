// const { sendTransaction } = require("../utils/web3");
const Rental = require("../models/Rental");
const sendTransaction = require("../utils/sendTransaction"); // Use mock version for now
const otpGenerator = require("otp-generator");
const multer = require("multer");
const path = require("path");
const jwt = require("jsonwebtoken");
// const otpGenerator = require("otp-generator");
const sendOTPEmail = require("../config/emailConfig");


// 📌 Create Listing
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
// const ownerPrivateKey = process.env.OWNER_PRIVATE_KEY;

exports.createListing = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ msg: "Image upload failed", error: err.message });
    }

    try {
      const { owner, rentAmount, deposit, description } = req.body;

      if (!req.file) {
        return res.status(400).json({ msg: "Image is required" });
      }

      const imageUrl = `/uploads/${req.file.filename}`; // Path to stored image

      const newListing = new Rental({
        owner,
        rentAmount,
        deposit,
        description, // Store product description
        imageUrl, // Store image path
        status: "Created",
      });

      await newListing.save();

      res.status(201).json({ msg: "Listing created successfully", listing: newListing });
    } catch (error) {
      res.status(500).json({ msg: "Server error", error: error.message });
    }
  });
};

//📌 Book Rental


exports.bookRental = async (req, res) => {
  try {
    const { rentalId, rentAmount, deposit, ownerPrivateKey } = req.body;

    // Extract JWT token and decode user email
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const renter = decoded.userId; // Assuming renter's ID is in the token
    const renterEmail = decoded.email; // Get email from token

    // Generate OTP
    const otp = otpGenerator.generate(6, { digits: true, alphabets: false, upperCase: false, specialChars: false });

    // Find rental item
    const rental = await Rental.findById(rentalId);
    if (!rental) return res.status(404).json({ msg: "Rental not found" });

    // Send OTP to user's email
    await sendOTPEmail(req.user.email, otp);

    // Call blockchain smart contract function
    const receipt = await sendTransaction(
      "rentItem",
      [renter, otp],
      rental.owner,
      ownerPrivateKey,
      (deposit + rentAmount).toString()
    );

    // Store rental details & OTP (for verification later)
    rental.renter = renter;
    rental.otp = otp;
    rental.status = "Rented";
    await rental.save();

    res.status(200).json({ 
      msg: "Rental booked successfully. OTP sent to registered email.",
      rental, 
      transactionHash: receipt.transactionHash 
    });

  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

// exports.bookRental = async (req, res) => {
//   try {
//     const { rentalId, renter, rentAmount, deposit, ownerPrivateKey } = req.body;
//     const otp = OTPGenerator.generate(6, { digits: true });

//     const rental = await Rental.findById(rentalId);
//     if (!rental) return res.status(404).json({ msg: "Rental not found" });

//     const receipt = await sendTransaction(
//       "rentItem",
//       [renter, otp],
//       rental.owner,
//       ownerPrivateKey,
//       (deposit + rentAmount).toString()
//     );

//     rental.renter = renter;
//     rental.otp = otp;
//     rental.status = "Rented";
//     await rental.save();

//     res.status(200).json({ msg: "Rental booked successfully", rental, transactionHash: receipt.transactionHash });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };

// // 📌 Confirm Return
// exports.confirmReturn = async (req, res) => {
//   try {
//     const { rentalId, renter, otpInput, renterPrivateKey } = req.body;

//     const rental = await Rental.findById(rentalId);
//     if (!rental) return res.status(404).json({ msg: "Rental not found" });

//     const receipt = await sendTransaction(
//       "confirmReturn",
//       [otpInput],
//       renter,
//       renterPrivateKey
//     );

//     rental.status = "Completed";
//     await rental.save();

//     res.status(200).json({ msg: "Rental return confirmed", rental, transactionHash: receipt.transactionHash });
//   } catch (error) {
//     res.status(500).json({ msg: "Server error", error: error.message });
//   }
// };
