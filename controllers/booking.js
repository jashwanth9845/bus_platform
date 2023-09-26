const Booking = require("../models/booking.js");

// Create multiple bookings at once
exports.createBookings = async (req, res) => {
  try {
    const { provider_id, bookings } = req.body; // Assuming you have the provider_id

    if (!Array.isArray(bookings) || bookings.length === 0) {
      return res.status(400).json({ error: "Invalid or empty booking data" });
    }

    // Add the provider_id to each booking
    const bookingsWithProvider = bookings.map((booking) => ({
      ...booking,
      provider_id,
    }));

    // Create multiple bookings in a transaction
    const createdBookings = await Booking.bulkCreate(bookingsWithProvider);

    res.status(201).json({
      message: "Successfully creating bookings",
      data: createdBookings,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error creating bookings" });
  }
};

exports.getBooking = async (req, res) => {
  try {
    const { customer_name, seat_number, booking_date } = req.query;

    if (!customer_name && !seat_number && !booking_date) {
      return res.status(400).json({
        error: "Provide at least one parameter to search for a booking",
      });
    }

    const condition = {};
    if (customer_name) condition.customer_name = customer_name;
    if (seat_number) condition.seat_number = seat_number;
    if (booking_date) condition.booking_date = booking_date;

    const booking = await Booking.findOne({ where: condition });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    res.status(200).json({
      message: "Successfully fetched booking details",
      data: booking,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error retrieving booking details" });
  }
};
