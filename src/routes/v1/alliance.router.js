const express = require("express");
const { roleBasedAuth, token } = require("../../middlewares");
const { AllianceController } = require("../../controllers");
const { constant } = require("../../utils");
const router = express.Router();

router.post(
  "/create/alliance",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  AllianceController.createAlliance,
);

router.get(
  "/get/all/alliances",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  AllianceController.getAlliances,
);

router.get(
  "/get/alliance/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  AllianceController.getAlliance,
);

router.put(
  "/update/alliance/:allianceId",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  AllianceController.updateAlliance,
);

router.delete(
  "/delete/alliance/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  AllianceController.deleteAlliance,
);

module.exports = router;

// cloudinary implement to upload logo
