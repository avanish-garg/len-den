// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  kycFilePath: String,  // Optional: for storing KYC file path
});

const User = mongoose.model('User', userSchema);

module.exports = User;
