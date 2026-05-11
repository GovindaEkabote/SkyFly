const expess = require("express");
const { constant } = require("../../utils");
const { roleBasedAuth, token } = require("../../middlewares");
const { airportController } = require("../../controllers");
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

router.get("/get/all/airports", token, airportController.getAirportsController);

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

router.patch(
  "/update/airport/status/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airportController.updateAirportStatus,
);

router.get(
  "/find/airport/status",
  token,
  airportController.findAirportByStatus,
);

router.get(
  "/find/airport/code",
  token,
  airportController.findAirportByCode,
);

router.get(
  "/search/airports",
  token,
  airportController.searchAirports,
);

module.exports = router;
