// Import necessary modules and controller
const express = require("express");
const router = express.Router();
const providersController = require("../../controllers/providers");

// Define routes and their corresponding controller functions
router.post("/createproviders", providersController.createProviders);
router.get("/getproviders", providersController.getProviders);

// Export the router for use in other parts of the application
module.exports = router;
