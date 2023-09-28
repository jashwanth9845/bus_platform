// Import necessary modules and controller
const express = require("express");
const router = express.Router();
const busRouteController = require("../../controllers/bus_route.js");

// Define routes and their corresponding controller functions
router.post("/createbusroutes", busRouteController.createBusRoute);
router.get("/getbusroutes", busRouteController.getBusRoutes);

// Export the router for use in other parts of the application
module.exports = router;
