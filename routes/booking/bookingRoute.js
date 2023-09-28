// Import necessary modules and controller
const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/booking.js");

// Define routes and their corresponding controller functions
router.post("/createbookings", bookingController.createBookings);
router.get("/getbookings", bookingController.getBooking);
router.post("/:bookingId/cancel", bookingController.cancelBooking);

// Export the router for use in other parts of the application
module.exports = router;
