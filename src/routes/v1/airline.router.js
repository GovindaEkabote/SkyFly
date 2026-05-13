const express = require("express");
const { constant } = require("../../utils");
const { roleBasedAuth, token } = require("../../middlewares");
const { airlineController } = require("../../controllers");
const router = express.Router();

router.post(
  "/create/airline",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.createAirline,
);

router.get(
  "/get/all/airlines",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.getAirlines,
);

router.get(
  "/get/airline/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.getAirlineById,
);

router.put(
  "/update/airline/:airlineId",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.updateAirline,
);

router.delete(
  "/delete/airline/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.deleteById,
);

router.put(
  "/update/airline/status/:airlineId",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.updateAirlineStatus,
);

router.delete(
  "/remove/airline/alliance/:airlineId",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.removeAlliance,
);

router.patch(
  "/add/airline/alliance/:airlineId",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.updateAirlineAlliance,
);

router.get("/search", token, airlineController.searchAirlines);

router.get(
  "/alliances/:allianceId/airlines",
  token,
  airlineController.getAirlinesByAllianceId,
);

router.get(
  "/airline/with/alliances",
  airlineController.getAllAirlinesWithAlliance,
);

router.get(
  "/airline/alliances/:id",
  airlineController.getAllianceWithAirlinesById,
);

router.get("/alliances/summary", airlineController.getAllianceMemberSummary);

router.patch(
  "/airlines/:airlineId/hubs",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  airlineController.addHubToAirline,
);



module.exports = router;
