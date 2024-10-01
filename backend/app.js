const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Initialize app
const app = express();
dotenv.config(); // Load environment variables

// Connect to MongoDB
connectDB();

// Middleware to parse JSON requests
app.use(express.json());

// Basic route for testing
app.get('/', (req, res) => {
  res.send('Hello, Len-Den!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
