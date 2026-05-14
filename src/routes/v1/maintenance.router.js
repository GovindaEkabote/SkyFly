const express = require("express");
const { constant } = require("../../utils");
const { roleBasedAuth, token } = require("../../middlewares");
const { maintenanceController } = require("../../controllers/index");
const router = express.Router();

router.post(
  "/maintananace",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin), 
  maintenanceController.createMaintenance
);


module.exports = router;