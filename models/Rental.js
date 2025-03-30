// const mongoose = require("mongoose");

// const RentalSchema = new mongoose.Schema({
//   owner: { type: String, required: true },
//   renter: { type: String, default: null },
//   rentAmount: { type: Number, required: true },
//   deposit: { type: Number, required: true },
//   otp: { type: String, default: null },
//   status: { type: String, enum: ["Created", "Rented", "Completed", "Canceled"], default: "Created" },
// }, { timestamps: true });

// module.exports = mongoose.model("Rental", RentalSchema);
const mongoose = require("mongoose");

const RentalSchema = new mongoose.Schema({
  owner: { type: String, required: true },
  rentAmount: { type: Number, required: true },
  deposit: { type: Number, required: true },
  status: { type: String, enum: ["Created", "Rented", "Completed", "Canceled"], default: "Created" },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Store image URL
  active: { type: Boolean, default: true },
  penalties: { type: Number, default: 0 },
  // txHash: { type: String, required: true } // Store Blockchain TX Hash
}, { timestamps: true });

module.exports = mongoose.model("Rental", RentalSchema);
