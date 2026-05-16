const { StatusCodes } = require("http-status-codes");
const { maintenanceService } = require("../services/index");
const { maintenanceRepository } = require("../repositories/index");

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

  async getAirlineMaintenances(req, res, next) {
    const { airlineId } = req.params;
    const queryParams = req.query;

    // Validate pagination parameters
    if (queryParams.page && (queryParams.page < 1 || isNaN(queryParams.page))) {
      return next(new AppError("Page must be a positive number", 400));
    }

    if (
      queryParams.limit &&
      (queryParams.limit < 1 || queryParams.limit > 100)
    ) {
      return next(new AppError("Limit must be between 1 and 100", 400));
    }

    // Validate status filter
    const validStatuses = [
      "scheduled",
      "in_progress",
      "completed",
      "delayed",
      "cancelled",
    ];
    if (queryParams.status && !validStatuses.includes(queryParams.status)) {
      return next(
        new AppError(`Status must be one of: ${validStatuses.join(", ")}`, 400),
      );
    }

    // Validate type filter
    const validTypes = [
      "A_check",
      "C_check",
      "engine_overhaul",
      "landing_gear",
      "avionics",
      "emergency",
      "scheduled",
    ];
    if (queryParams.type && !validTypes.includes(queryParams.type)) {
      return next(
        new AppError(`Type must be one of: ${validTypes.join(", ")}`, 400),
      );
    }

    // Get maintenance records
    const result = await maintenanceService.getAirlineMaintenances(
      airlineId,
      queryParams,
    );

    res.status(200).json({
      success: true,
      message: "Maintenance records retrieved successfully",
      data: result.data,
      pagination: result.pagination,
      summary: result.summary,
      filters: result.filters,
      timestamp: new Date().toISOString(),
    });
  }

  async getAirlineMaintenanceRecords(req, res, next) {
    try {
      const { airlineId } = req.params;
      const queryParams = req.query;

      const result = await maintenanceService.getAirlineMaintenanceRecords(
        airlineId,
        queryParams,
      );

      res.status(200).json({
        status: "success",
        message: "Maintenance records retrieved successfully",
        data: result.data,
        pagination: result.pagination,
        filters: result.filters,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }

  async getMaintenanceSummary(req, res, next) {
    try {
      const { airlineId } = req.params;

      const result = await maintenanceService.getMaintenanceSummary(airlineId);

      res.status(200).json({
        status: "success",
        message: "Maintenance summary retrieved successfully",
        data: result,
        timestamp: new Date().toISOString(),
      });
    } catch (error) {
      next(error);
    }
  }
  async getMaintenanceByStatus(req, res, next) {
    try {
      const { airlineId, status } = req.params;

      const result = await maintenanceService.getMaintenanceByStatus(
        airlineId,
        status,
      );

      res.status(200).json({
        status: "success",
        message: `Maintenance records with status '${status}' retrieved successfully`,
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async exportMaintenanceRecords(req, res, next) {
    try {
      const { airlineId } = req.params;
      const filters = req.query;

      const result = await maintenanceService.exportMaintenanceRecords(
        airlineId,
        filters,
      );

      res.status(200).json({
        status: "success",
        message: "Maintenance records exported successfully",
        data: {
          totalRecords: result.totalRecords,
          records: result.data,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async getUpcomingMaintenance(req, res, next) {
    try {
      const { airlineId } = req.params;
      const { days = 30 } = req.query;

      // This would need a new service method
      const upcoming = await maintenanceRepository.getUpcomingMaintenance(
        airlineId,
        parseInt(days),
      );

      res.status(200).json({
        status: "success",
        message: `Upcoming maintenance for next ${days} days retrieved successfully`,
        data: {
          days: parseInt(days),
          count: upcoming.length,
          records: upcoming,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new MaintenanceController();
