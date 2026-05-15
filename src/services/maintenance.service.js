const { maintenanceRepository } = require("../repositories/index");

class MaintenanceService {
  async createMaintenance(maintenanceData, userId) {
    try {
      // Validate required fields
      const requiredFields = ["airline", "aircraft", "type", "scheduledDate"];

      for (const field of requiredFields) {
        if (!maintenanceData[field]) {
          throw new Error(`${field} is required`);
        }
      }

      // Validate scheduled date
      if (new Date(maintenanceData.scheduledDate) < new Date()) {
        throw new Error("Scheduled date cannot be in the past");
      }

      // Validate airline & aircraft
      const validation = await maintenanceRepository.validateReferences(
        maintenanceData.airline,
        maintenanceData.aircraft,
      );

      if (!validation.airlineExists) {
        throw new Error("Airline not found or deleted");
      }

      if (!validation.aircraftExists) {
        throw new Error("Aircraft not found or deleted");
      }

      if (!validation.aircraftBelongsToAirline) {
        throw new Error("Aircraft does not belong to the specified airline");
      }

      // Check overlapping maintenance
      const overlapping =
        await maintenanceRepository.findOverlappingMaintenance(
          maintenanceData.aircraft,
          maintenanceData.scheduledDate,
        );

      if (overlapping.length > 0) {
        throw new Error(
          `Aircraft already has maintenance scheduled on this date. Overlapping with: ${overlapping[0].type}`,
        );
      }

      // Prepare data
      const newMaintenanceData = {
        ...maintenanceData,
        createdBy: userId,
        status: maintenanceData.status || "scheduled",
      };

      // Create maintenance
      const maintenance =
        await maintenanceRepository.createMaintenanceRecord(newMaintenanceData);

      // Update airline maintenance summary
      if (maintenance.status === "scheduled") {
        await maintenanceRepository.updateAirlineMaintenanceSummary(
          maintenanceData.airline,
          true,
          false,
        );
      }

      // Update aircraft maintenance
      await maintenanceRepository.updateAircraftMaintenance(
        maintenanceData.aircraft,
        null,
        maintenanceData.scheduledDate,
      );

      // Return populated maintenance record
      return await maintenanceRepository.findById(maintenance._id);
    } catch (error) {
      throw error;
    }
  }

  async getAllRecords(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const maintenanceRecords = await maintenanceRepository.findAllMaintenance(
        skip,
        limit,
      );
      const totalRecords =
        await maintenanceRepository.countMaintenanceRecords();
      if (maintenanceRecords.length === 0) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "No maintenance records found",
        };
      }
      return {
        data: maintenanceRecords,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalRecords: Math.ceil(totalRecords / limit),
          hasNext: page * limit < totalRecords,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getMaintenanceById(id) {
    try {
      const maintenance = await maintenanceRepository.getMaintenanceById(id);
      if (!maintenance) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "Maintenance record not found",
        };
      }
      return maintenance;
    } catch (error) {
      throw error;
    }
  }

  async updateStatus(id, status) {
    try {
      const updateStatus = await maintenanceRepository.updateStatus(id, status);
      return updateStatus;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new MaintenanceService();
