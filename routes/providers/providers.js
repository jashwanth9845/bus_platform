const express = require("express");
const router = express.Router();
const providersController = require("../../controllers/providers");

router.post("/createproviders", providersController.createProviders);
router.get("/getproviders", providersController.getProviders);

module.exports = router;
