const express = require("express");
const router = express.Router();
const bookingRoutes = require("./booking/bookingRoute");
const busRouteRoutes = require("./bus_route/busRoute");
const providersRoutes = require("./providers/providers");

// Use the routes from the other files
router.use("/bookings", bookingRoutes);
router.use("/busroutes", busRouteRoutes);
router.use("/providers", providersRoutes);

module.exports = router;
