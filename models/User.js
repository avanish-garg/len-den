const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["lender", "renter", "admin"], default: "renter" },
  address: { type: String, default: "" }, // Add blockchain address field
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);