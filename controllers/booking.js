// Import required modules and models
const Booking = require("../models/booking.js");
const sequelize = require("../config/db");
const Decimal = require("decimal.js");
const BusRoute = require("../models/bus_route.js");
const Payment = require("../models/payment.js");

// Controller function to create bookings
exports.createBookings = async (req, res) => {
  try {
    const { bookings } = req.body;

    // Check if the 'bookings' data is an array and not empty
    if (!Array.isArray(bookings) || bookings.length === 0) {
      return res.status(400).json({ error: "Invalid or empty booking data" });
    }

    const createdBookings = [];

    // Process each booking in the request
    for (const booking of bookings) {
      const { customer_name, seat_number, bus_id } = booking;

      // Find the corresponding bus route based on the provided 'bus_id'
      const busRoute = await BusRoute.findOne({
        where: {
          id: bus_id,
        },
      });

      // If no bus route is found for the given 'bus_id', return a 404 error
      if (!busRoute) {
        return res.status(404).json({ error: "No Busses are available" });
      }

      // Calculate the booking amount (fare + 2%)
      const fare = new Decimal(busRoute.fare); // Get the fare from the bus route
      const bookingAmount = fare.mul(1.02); // Add 2% to the fare
      console.log("bookingAmount: ", bookingAmount);

      // Create a new booking and associate it with the bus route
      const createdBooking = await Booking.create({
        customer_name,
        seat_number,
        bus_route_id: busRoute.id,
      });

      // Create a payment record for the booking with the calculated amount
      await Payment.create({
        booking_id: createdBooking.id,
        amount: bookingAmount.toNumber(),
      });

      // Add the created booking to the list of created bookings
      createdBookings.push(createdBooking);
    }

    // Return a success response with the created bookings
    res.status(201).json({
      message: "Successfully creating bookings",
      data: createdBookings,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    res.status(500).json({ error: "Error creating bookings" });
  }
};

// Controller function to retrieve booking details
exports.getBooking = async (req, res) => {
  try {
    // Extract query parameters from the request
    const { customer_name, seat_number, booking_date } = req.query;

    // Check if at least one parameter is provided to search for a booking
    if (!customer_name && !seat_number && !booking_date) {
      return res.status(400).json({
        error: "Provide at least one parameter to search for a booking",
      });
    }

    // Define a condition object to build the query based on provided parameters
    const condition = {};

    // Add conditions for filtering by customer name, seat number, and booking date
    if (customer_name) condition.customer_name = customer_name;
    if (seat_number) condition.seat_number = seat_number;
    if (booking_date)
      condition.booking_date = sequelize.literal(
        `DATE(booking_date) = '${booking_date}'`
      );

    // Find a booking that matches the provided conditions
    const booking = await Booking.findOne({
      where: condition,
      include: BusRoute, // Include the associated bus route in the query result
    });

    // If no matching booking is found, return a 404 error
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Return a success response with the fetched booking details
    res.status(200).json({
      message: "Successfully fetched booking details",
      data: booking,
    });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error:", error);
    res.status(500).json({ error: "Error retrieving booking details" });
  }
};

// Controller function to cancel a booking
exports.cancelBooking = async (req, res) => {
  try {
    // Extract the 'bookingId' parameter from the request
    const { bookingId } = req.params;

    // Find the booking by its ID and include the associated payment record
    const booking = await Booking.findByPk(bookingId, {
      include: Payment, // Include the associated payment record
    });

    // If no matching booking is found, return a 404 error
    if (!booking) {
      return res.status(404).json({ error: "Booking not found" });
    }

    // Check if the booking is already cancelled; if so, return a 400 error
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

    // Return a success response with details about the cancellation
    res.status(200).json({
      message: "Booking cancelled successfully",
      data: {
        cancellationFee: cancellationFee,
        refundedAmount: refundedAmount,
      },
    });
  } catch (error) {
    // Handle any errors that occur during the cancellation process
    console.error("Error:", error);
    res.status(500).json({ error: "Error cancelling booking" });
  }
};
