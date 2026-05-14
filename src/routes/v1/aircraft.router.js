const express = require("express");
const router = express.Router();
const { aircraftController } = require("../../controllers/index");

router.post("/create/aircraft", aircraftController.create);

module.exports = router;
