const express = require("express");
const { constant } = require("../../utils");
const { roleBasedAuth, token } = require("../../middlewares");
const { maintenanceController } = require("../../controllers/index");
const router = express.Router();

router.post(
  "/maintananace",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  maintenanceController.createMaintenance,
);

router.get("/maintananace", token, maintenanceController.getAllMaintenance);

router.get(
  "/maintananace/:id",
  token,
  maintenanceController.getMaintenanceById,
);

router.patch(
  "/maintananace/update/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  maintenanceController.updateStatus,
);

router.put(
  "/maintananace/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  maintenanceController.updateMaintenanceRecord,
);

router.delete(
  "/maintananace/:id",
  token,
  roleBasedAuth(constant.airline_admin, constant.super_admin),
  maintenanceController.deleteRecord,
);

module.exports = router;
