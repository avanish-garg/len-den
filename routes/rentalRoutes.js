const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");
const { authenticateUser } = require("../middleware/auth");

// Rental routes
router.post("/create-listing", rentalController.createListing);
router.post("/book",authenticateUser, rentalController.bookRental);
// router.post("/confirm-return", rentalController.confirmReturn);

module.exports = router;
