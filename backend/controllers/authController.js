const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('../models/User');

// Load environment variables
require('dotenv').config();

// JWT Secret key from .env
const secretKey = process.env.JWT_SECRET;

// Nodemailer transport setup (using environment variables)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Your email from .env
    pass: process.env.EMAIL_PASS,  // Your email password (or app password)
  },
});

// 1. Forgot Password - Request Token
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  // Create a token for password reset
  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

  // Send email with the reset token (URL to reset password)
  const resetLink = `http://localhost:5000/api/auth/resetPassword/${token}`;

  const mailOptions = {
    from: process.env.EMAIL_USER,  // From the email in the .env
    to: email,
    subject: 'Password Reset Request',
    text: `Click the following link to reset your password: ${resetLink}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({ message: 'Password reset link sent to your email.' });
  } catch (error) {
    res.status(500).json({ message: 'Error sending email', error });
  }
};

// 2. Reset Password - Set New Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  // Verify token
  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) return res.status(400).json({ message: 'Invalid or expired token' });

    // Find user by ID decoded from token
    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ message: 'User not found' });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update password in the database
    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  });
};

module.exports = { register, login, forgotPassword, resetPassword };
