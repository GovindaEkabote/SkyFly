const expess = require("express");
const { constant } = require("../../utils");
const { roleBasedAuth, token } = require("../../middlewares");
const {airportController} = require("../../controllers");
const router = expess.Router();

router.post(
  "/create/airport",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airportController.createAirportController,
);

router.get(
  "/get/airport/:id",
  token,
  airportController.getAirportByIdController,
);

router.get(
  "/get/all/airports",
  token,
  airportController.getAirportsController,
);

router.put(
  "/update/airport/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airportController.updateAirportById,
);

router.delete(
  "/delete/airport/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airportController.deleteAirportById,
);

module.exports = router;
