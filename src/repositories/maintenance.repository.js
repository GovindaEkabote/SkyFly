const { Maintenance, Airline, Aircraft } = require("../models/index");
const { constant, maintenanceStatus } = require("../utils");

class MaintenanceRepository {
  async createMaintenanceRecord(data) {
    const maintenanceRecord = new Maintenance(data);
    return await maintenanceRecord.save();
  }

  async findById(id) {
    return await Maintenance.findById(id)
      .populate("airline", "code name status")
      .populate("aircraft", "registration model manufacturer")
      .populate("createdBy", "name  email");
  }

  async updateStatus(id, status, additionalData = {}) {
    try {
      const updateData = { status, ...additionalData };

      // If status is 'in_progress', set startDate
      if (
        status === maintenanceStatus.in_progress &&
        !additionalData.startDate
      ) {
        updateData.startDate = new Date();
      }
      // If status is 'completed', set completionDate and calculate duration
      if (status === maintenanceStatus.completed) {
        updateData.completionDate = new Date();

        // Get the maintenance record to calculate duration
        const maintenanceRecord = await Maintenance.findById(id);
        if (maintenanceRecord && maintenanceRecord.startDate) {
          const duration =
            (new Date() - maintenanceRecord.startDate) / (1000 * 60 * 60); // Duration in hours

          updateData.duration = Math.round(duration * 10) / 10; // Round to 2 decimal places
        }
      }

      return await Maintenance.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
    } catch (error) {
      throw new Error(
        `Error updating maintenance record status: ${error.message}`,
      );
    }
  }

  async updateAirlineMaintenanceSummary(
    airlineId,
    isAdding = true,
    isActive = false,
  ) {
    try {
      const updateOperation = {};

      if (isAdding) {
        updateOperation.$inc = { "maintenanceSummary.totalChecks": 1 };

        if (isActive) {
          updateOperation.$inc = { "maintenanceSummary.activeMaintenance": 1 };
        }
      } else {
        updateOperation.$inc = { "maintenanceSummary.activeMaintenance": -1 };
      }

      updateOperation.$set = {
        "maintenanceSummary.lastMaintenanceDate": new Date(),
        "maintenanceSummary.nextMaintenanceDue": new Date(
          Date.now() + 100 * 24 * 60 * 60 * 1000,
        ),
      };
      return await Airline.findByIdAndUpdate(airlineId, updateOperation, {
        new: true,
      });
    } catch (error) {
      throw error;
    }
  }

  async updateAircraftMaintenance(aircraftId, maintenanceDate, nextDueDate) {
    try {
      return await Aircraft.findByIdAndUpdate(
        aircraftId,
        {
          $set: {
            lastMaintenanceDate: maintenanceDate,
            nextMaintenanceDue: nextDueDate,
            status: "active", // Reset aircraft status after maintenance
          },
        },
        { new: true },
      );
    } catch (error) {
      throw error;
    }
  }

  async findOverlappingMaintenance(
    aircraftId,
    scheduledDate,
    excludeId = null,
  ) {
    try {
      const query = {
        aircraft: aircraftId,

        status: {
          $in: [maintenanceStatus.scheduled, maintenanceStatus.in_progress],
        },

        scheduledDate: {
          $gte: new Date(scheduledDate),

          $lt: new Date(
            new Date(scheduledDate).setDate(
              new Date(scheduledDate).getDate() + 1,
            ),
          ),
        },
      };

      if (excludeId) {
        query._id = { $ne: excludeId };
      }

      return await Maintenance.find(query);
    } catch (error) {
      throw error;
    }
  }
  async validateReferences(airlineId, aircraftId) {
    try {
      const [airline, aircraft] = await Promise.all([
        Airline.findById(airlineId),
        Aircraft.findById(aircraftId),
      ]);

      return {
        airlineExists: !!airline && !airline.isDeleted,
        aircraftExists: !!aircraft && !aircraft.isDeleted,
        aircraftBelongsToAirline:
          aircraft && aircraft.airline.toString() === airlineId.toString(),
      };
    } catch (error) {
      throw error;
    }
  }

  countMaintenanceRecords() {
    return Maintenance.countDocuments();
  }

  async findAllMaintenance(skip, limit) {
    return await Maintenance.find()
      .populate("createdBy", "name  email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async getMaintenanceById(id) {
    return await Maintenance.findById(id)
      .populate("airline", "code name status")
      .populate("aircraft", "registration model manufacturer")
      .populate("createdBy", "name  email");
  }

  async updateStatus(id, status) {
    return await Maintenance.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true },
    );
  }

  async updateMaintenanceRecord(id, data) {
    return await Maintenance.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );
  }

  async deleteMaintenance(id) {
    return Maintenance.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }
}

module.exports = new MaintenanceRepository();
