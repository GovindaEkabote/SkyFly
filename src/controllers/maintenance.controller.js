const { maintenanceService } = require("../services/index");

class MaintenanceController {
  async createMaintenance(req, res, next) {
    try {
     
      const maintenanceData = req.body;

      const maintenance = await maintenanceService.createMaintenance(
        maintenanceData,
      );

      res.status(201).json({
        success: true,
        message: "Maintenance record created successfully",
        data: maintenance,
      });
    } catch (error) {
      next(error);
    }
  }
}


module.exports = new MaintenanceController();
