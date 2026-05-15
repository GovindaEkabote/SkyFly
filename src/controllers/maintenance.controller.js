const { StatusCodes } = require("http-status-codes");
const { maintenanceService } = require("../services/index");

class MaintenanceController {
  async createMaintenance(req, res, next) {
    try {
      const maintenanceData = req.body;

      const maintenance =
        await maintenanceService.createMaintenance(maintenanceData);

      res.status(201).json({
        success: true,
        message: "Maintenance record created successfully",
        data: maintenance,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAllMaintenance(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const maintenanceRecords = await maintenanceService.getAllRecords(
        page,
        limit,
      );
      res.status(200).json({
        success: true,
        message: "Maintenance records retrieved successfully",
        ...maintenanceRecords,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getMaintenanceById(req, res, next) {
    try {
      const { id } = req.params;
      const maintenance = await maintenanceService.getMaintenanceById(id);
      res.status(200).json({
        success: true,
        message: "Maintenance record retrieved successfully",
        data: maintenance,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const update = await maintenanceService.updateStatus(id, status);
      if (!update) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Record Not Found",
        });
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Record Status has been updated",
        data: update,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async updateMaintenanceRecord(req, res, next) {
    try {
      const { id } = req.params;
      const data = req.body;
      const updatedRecord = await maintenanceService.updateData(id, data);
      if (!updatedRecord) {
        res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Record Not Found",
        });
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Record updated successfully",
        data: updatedRecord,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteRecord(req, res, next) {
    try {
      const { id } = req.params;
      const deleteRecord = await maintenanceService.softdelete(id);
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Record deleted successfully",
        data: deleteRecord,
      });
    } catch (error) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new MaintenanceController();
