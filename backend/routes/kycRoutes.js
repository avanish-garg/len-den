const express = require('express');
const router = express.Router();
const { uploadKYC, uploadKYCFile } = require('../controllers/kycController');

router.post('/uploadKYC', uploadKYC, uploadKYCFile);

module.exports = router;
