const mongoose = require('mongoose');

// Define User schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  kycFilePath: String,  // KYC file path
});

module.exports = mongoose.model('User', userSchema);
