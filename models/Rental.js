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
  description: { type: String, required: true },
  imageUrl: { type: String, required: true }, // Store image URL
  status: { type: String, enum: ["Created", "Rented", "Completed", "Canceled"], default: "Created" },
}, { timestamps: true });

module.exports = mongoose.model("Rental", RentalSchema);
