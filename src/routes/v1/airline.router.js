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

module.exports = router;
