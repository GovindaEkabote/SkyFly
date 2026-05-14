const express = require("express");
const router = express.Router();
const { aircraftController } = require("../../controllers/index");

router.post("/create/aircraft", aircraftController.create);
router.get("/aircrafts", aircraftController.getAll);
router.get("/aircrafts/:id", aircraftController.getById);
router.put("/aircrafts/:id", aircraftController.update);
router.delete("/aircrafts/:id", aircraftController.delete);
router.get("/fleets/:id/aircrafts", aircraftController.getAirlineFleet);
router.patch("/aircrafts/:id/status", aircraftController.updateAircraftStatus);

module.exports = router;
