const express = require('express');
const router = express.Router();
const { register, login, forgotPassword, resetPassword } = require('../controllers/authController');

// Register and Login routes
router.post('/register', register);
router.post('/login', login);

// Forgot Password - Request Token
router.post('/forgotPassword', forgotPassword);

// Reset Password - Set New Password
router.post('/resetPassword/:token', resetPassword);

module.exports = router;
