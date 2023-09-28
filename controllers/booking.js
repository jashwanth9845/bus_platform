const Booking = require("../models/booking.js");
const sequelize = require("../config/db");
const Decimal = require("decimal.js");
const BusRoute = require("../models/bus_route.js");
const Payment = require("../models/payment.js"); // Import the Payment model

exports.createBookings = async (req, res) => {
  try {
    const { bookings } = req.body;

    if (!Array.isArray(bookings) || bookings.length === 0) {
      return res.status(400).json({ error: "Invalid or empty booking data" });
    }

    const createdBookings = [];

    // Process each booking
    for (const booking of bookings) {
      const { customer_name, seat_number, bus_id } = booking;

      // Find the corresponding bus route based on the provided parameters
      const busRoute = await BusRoute.findOne({
        where: {
          id: bus_id,
        },
      });

      if (!busRoute) {
        return res.status(404).json({ error: "No Busses are available" });
      }

      // Calculate the booking amount (fare + 2%)
      const fare = new Decimal(busRoute.fare); // Get the fare from the bus route
      const bookingAmount = fare.mul(1.02); // Add 2% to the fare
      console.log("bookingAmount: ", bookingAmount);

      // Create the booking and associate it with the bus route
      const createdBooking = await Booking.create({
        customer_name,
        seat_number,
        bus_route_id: busRoute.id,
      });

      // Create a payment record for the booking
      await Payment.create({
        booking_id: createdBooking.id,
        amount: bookingAmount.toNumber(),
      });

      createdBookings.push(createdBooking);
    }

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
    if (booking_date)
      condition.booking_date = sequelize.literal(
        `DATE(booking_date) = '${booking_date}'`
      );

    const booking = await Booking.findOne({
      where: condition,
      include: BusRoute, // Include the associated bus route in the query result
    });

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

exports.cancelBooking = async (req, res) => {
  try {
    const { bookingId } = req.params;

    // Find the booking by ID
    const booking = await Booking.findByPk(bookingId, {
      include: Payment, // Include the associated payment record
    });

    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    if (booking.is_cancelled) {
      return res.status(400).json({ error: "Booking is already cancelled" });
    }

    // Calculate the cancellation fee (5% of the booking amount)
    const bookingAmount = booking.Payment.amount; // Get the booking amount from the associated payment
    const cancellationFee = 0.05 * bookingAmount;
    const refundedAmount = bookingAmount - cancellationFee;

    // Update the payment record to mark it as refunded
    await booking.Payment.update({
      is_refunded: true,
    });

    // Update the booking record to mark it as cancelled and store the cancellation fee
    await booking.update({
      is_cancelled: true,
      cancellation_fee: cancellationFee,
    });

    res.status(200).json({
      message: "Booking cancelled successfully",
      data: {
        cancellationFee: cancellationFee,
        refundedAmount: refundedAmount,
      },
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Error cancelling booking" });
  }
};
