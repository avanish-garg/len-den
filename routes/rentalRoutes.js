const express = require("express");
const router = express.Router();
const rentalController = require("../controllers/rentalController");
const { authenticateUser } = require("../middleware/auth");

// Rental routes
router.post("/create-listing", rentalController.createListing);
router.post("/book",authenticateUser, rentalController.bookRental);
router.post("/complete",authenticateUser, rentalController.completeRental);
router.post("/cancel",authenticateUser, rentalController.cancelRental);
// router.post("/confirm-return", rentalController.confirmReturn);
router.post("/addPenalty",authenticateUser, rentalController.addPenalty);
module.exports = router;
