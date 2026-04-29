const express = require("express");
const { roleBasedAuth, token } = require("../../middlewares");
const { AllianceController } = require("../../controllers");
const { constant } = require("../../utils");
const router = express.Router();


router.post(
  "/create/alliance",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  AllianceController.createAlliance
);



module.exports = router;


// cloudinary implement to upload logo