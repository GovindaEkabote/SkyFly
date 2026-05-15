const express = require("express");
const { constant } = require("../../utils");
const { roleBasedAuth, token } = require("../../middlewares");
const router = express.Router();
const { aircraftController } = require("../../controllers/index");

router.post(
  "/create/aircraft",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  aircraftController.create,
);
router.get("/aircrafts", token, aircraftController.getAll);
router.get("/aircrafts/:id", token, aircraftController.getById);
router.put(
  "/aircrafts/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  aircraftController.update,
);
router.delete(
  "/aircrafts/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  aircraftController.delete,
);
router.get("/fleets/:id/aircrafts", token, aircraftController.getAirlineFleet);
router.patch(
  "/aircrafts/:id/status",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  aircraftController.updateAircraftStatus,
);

module.exports = router;
