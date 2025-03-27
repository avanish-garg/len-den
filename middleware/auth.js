// const jwt = require("jsonwebtoken");

// exports.authenticateUser = async(req, res, next) => {
//   const token = req.header("Authorization");

//   if (!token) return res.status(401).json({ msg: "Access Denied. No token provided." });

//   try {
//     const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");
//     // req.user = decoded.userId; // Attach user info to request
    
//     req.user = { _id: decoded.userId }; // ✅ Store in expected format
    
//     console.log("Authenticated User:", req.user);
//     next();
//   } catch (error) {
//     res.status(401).json({ msg: "Invalid token" });
//   }
// };
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Ensure correct path

exports.authenticateUser = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Access Denied. No token provided." });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select("email _id");

    if (!req.user) {
      return res.status(404).json({ msg: "User not found" });
    }

    console.log("Authenticated User:", req.user);
    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({ msg: "Invalid token" });
  }
};


// Middleware to verify admin
exports.verifyAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || user.role !== "admin") {
      return res.status(403).json({ msg: "Access Denied. Admins only." });
    }
    next();
  } catch (error) {
    res.status(500).json({ msg: "Server error", error: error.message });
  }
};

