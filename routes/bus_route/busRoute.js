const express = require("express");
const router = express.Router();
const busRouteController = require("../../controllers/bus_route.js");

router.post("/createbusroutes", busRouteController.createBusRoute);
router.get("/getbusroutes", busRouteController.getBusRoutes);

module.exports = router;
