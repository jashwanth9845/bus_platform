const express = require("express");
const router = express.Router();
const bookingController = require("../../controllers/booking.js");

router.post("/createbookings", bookingController.createBookings);
router.get("/getbookings", bookingController.getBooking);

module.exports = router;
