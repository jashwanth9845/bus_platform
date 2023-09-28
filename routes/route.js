// Import necessary modules and route files
const express = require("express");
const router = express.Router();
const bookingRoutes = require("./booking/bookingRoute"); // Import booking route
const busRouteRoutes = require("./bus_route/busRoute"); // Import bus route route
const providersRoutes = require("./providers/providers"); // Import providers route

// Use the routes from the imported route files
router.use("/bookings", bookingRoutes); // Use booking routes under the "/bookings" path
router.use("/busroutes", busRouteRoutes); // Use bus route routes under the "/busroutes" path
router.use("/providers", providersRoutes); // Use providers routes under the "/providers" path

// Export the router for use in other parts of the application
module.exports = router;
