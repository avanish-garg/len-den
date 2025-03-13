const multer = require('multer');
const path = require('path');
const User = require('../models/User');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/kyc/');  // Store in 'uploads/kyc' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));  // Unique file name
  }
});

const upload = multer({ storage });

// KYC Document Upload Route
const uploadKYC = upload.single('kycFile'); // Single file upload (kycFile is the form field)

const uploadKYCFile = (req, res) => {
  const userId = req.user.id;  // Assuming user is authenticated
  const filePath = req.file.path;

  User.findByIdAndUpdate(userId, { kycFilePath: filePath })
    .then(() => res.json({ message: 'KYC document uploaded successfully' }))
    .catch(err => res.status(500).json({ error: err.message }));
};

module.exports = { uploadKYC, uploadKYCFile };
