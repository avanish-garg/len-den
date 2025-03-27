require("dotenv").config();
const express = require("express");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const kycRoutes = require("./routes/kycRoutes");
const emailRoutes = require("./routes/emailRoutes");
const rentalRoutes = require("./routes/rentalRoutes");
const cartRoutes = require("./routes/cartRoutes");

const app = express();
app.use(express.json());

connectDB();

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/rentals", rentalRoutes);
app.use("/api", emailRoutes);
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
