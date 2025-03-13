// server.js
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const nodemailer = require('nodemailer');
const User = require('./models/User');
const app = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost/aptrent', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB error', err));

// Nodemailer transport setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com', // Your email address
    pass: 'your-email-password',  // Your email password or app-specific password
  },
});

// JWT Secret key (store it securely in .env file in real applications)
const secretKey = 'your_jwt_secret_key';

// Register user
const register = async (req, res) => {
  const { email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(400).json({ message: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ email, password: hashedPassword });
  await newUser.save();
  res.status(201).json({ message: 'User registered successfully' });
};

// Login user
const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(400).json({ message: 'User not found' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });
  res.json({ token });
};

// Forgot Password - Request Token
const forgotPassword = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: 'User not found' });

  const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '1h' });

  const resetLink = `http://localhost:5000/api/auth/resetPassword/${token}`;

  const mailOptions = {
    from: 'your-email@gmail.com',
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

// Reset Password - Set New Password
const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  jwt.verify(token, secretKey, async (err, decoded) => {
    if (err) return res.status(400).json({ message: 'Invalid or expired token' });

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(400).json({ message: 'User not found' });

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  });
};



// Define routes for authentication
app.post('/api/auth/register', register);
app.post('/api/auth/login', login);
app.post('/api/auth/forgotPassword', forgotPassword);
app.post('/api/auth/resetPassword/:token', resetPassword);

// Sample route to check server
app.get('/', (req, res) => {
  res.send('Welcome to APTORENT Backend');
});

// Server running on PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
