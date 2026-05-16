const mongoose = require("mongoose");
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
      .populate("createdBy", "name email");
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

          updateData.duration = Math.round(duration * 10) / 10; // Round to 1 decimal place
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
          aircraft && aircraft.airline?.toString() === airlineId?.toString(),
      };
    } catch (error) {
      throw error;
    }
  }

  countMaintenanceRecords() {
    return Maintenance.countDocuments();
  }

  async findAllMaintenance(skip, limit) {
    return await Maintenance.find({ isDeleted: false })
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
  }

  async getMaintenanceById(id) {
    return await Maintenance.findById(id)
      .populate("airline", "code name status")
      .populate("aircraft", "registration model manufacturer")
      .populate("createdBy", "name email");
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

  async findByAirline(airlineId, filters = {}, pagination = {}) {
    const { status, type, priority, startDate, endDate, minCost, maxCost } = filters;
    const { page = 1, limit = 10 } = pagination;
    const query = {
      airline: airlineId,
      isDeleted: false,
    };
    if (status) query.status = status;
    if (type) query.type = type;
    if (priority) query.priority = priority;
    if (startDate || endDate) {
      query.scheduledDate = {};
      if (startDate) query.scheduledDate.$gte = new Date(startDate);
      if (endDate) query.scheduledDate.$lte = new Date(endDate);
    }
    if (minCost || maxCost) {
      query.cost = {};
      if (minCost) query.cost.$gte = Number(minCost);
      if (maxCost) query.cost.$lte = Number(maxCost);
    }
    const skip = (page - 1) * limit;
    const [maintenances, total] = await Promise.all([
      Maintenance.find(query)
        .populate("aircraft", "registration model manufacturer")
        .populate("createdBy", "name email")
        .skip(skip)
        .limit(parseInt(limit)),
      Maintenance.countDocuments(query),
    ]);

    return {
      data: maintenances,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  async getSummaryByAirline(airlineId) {
    const matchStage = {
      airline: new mongoose.Types.ObjectId(airlineId),
      isDeleted: false,
    };

    const summary = await Maintenance.aggregate([
      { $match: matchStage },
      {
        $group: {
          _id: null,
          totalMaintenances: { $sum: 1 },
          totalActualCost: { $sum: "$cost.actual" },
          totalEstimatedCost: { $sum: "$cost.estimated" },
          averageDuration: { $avg: "$duration" },
          completedCount: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          inProgressCount: {
            $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] },
          },
          scheduledCount: {
            $sum: { $cond: [{ $eq: ["$status", "scheduled"] }, 1, 0] },
          },
          delayedCount: {
            $sum: { $cond: [{ $eq: ["$status", "delayed"] }, 1, 0] },
          },
          cancelledCount: {
            $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalMaintenances: 1,
          totalActualCost: { $ifNull: ["$totalActualCost", 0] },
          totalEstimatedCost: { $ifNull: ["$totalEstimatedCost", 0] },
          costVariance: {
            $subtract: [
              { $ifNull: ["$totalActualCost", 0] },
              { $ifNull: ["$totalEstimatedCost", 0] },
            ],
          },
          averageDuration: { $ifNull: ["$averageDuration", 0] },
          statusBreakdown: {
            completed: "$completedCount",
            inProgress: "$inProgressCount",
            scheduled: "$scheduledCount",
            delayed: "$delayedCount",
            cancelled: "$cancelledCount",
          },
          completionRate: {
            $multiply: [
              { $divide: ["$completedCount", { $max: ["$totalMaintenances", 1] }] },
              100,
            ],
          },
        },
      },
    ]);

    return (
      summary[0] || {
        totalMaintenances: 0,
        totalActualCost: 0,
        totalEstimatedCost: 0,
        costVariance: 0,
        averageDuration: 0,
        statusBreakdown: {
          completed: 0,
          inProgress: 0,
          scheduled: 0,
          delayed: 0,
          cancelled: 0,
        },
        completionRate: 0,
      }
    );
  }

  async getBreakdownByType(airlineId) {
    return await Maintenance.aggregate([
      {
        $match: {
          airline: new mongoose.Types.ObjectId(airlineId),
          isDeleted: false,
        },
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          totalCost: { $sum: "$cost.actual" },
          averageDuration: { $avg: "$duration" },
        },
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          totalCost: 1,
          averageDuration: 1,
          _id: 0,
        },
      },
      { $sort: { count: -1 } },
    ]);
  }

  async getUpcomingMaintenance(airlineId, daysAhead = 30) {
    const today = new Date();
    const futureDate = new Date();
    futureDate.setDate(today.getDate() + daysAhead);

    return await Maintenance.find({
      airline: new mongoose.Types.ObjectId(airlineId),
      scheduledDate: { $gte: today, $lte: futureDate },
      status: "scheduled",
      isDeleted: false,
    })
      .populate("aircraft", "registration model")
      .sort({ scheduledDate: 1 });
  }

  async getOverdueMaintenance(airlineId) {
    return await Maintenance.find({
      airline: new mongoose.Types.ObjectId(airlineId),
      scheduledDate: { $lt: new Date() },
      status: { $in: ["scheduled", "in_progress"] },
      isDeleted: false,
    })
      .populate("aircraft", "registration model")
      .sort({ scheduledDate: 1 });
  }

  async findByAirlineMaintenance(airlineId, filters = {}, pagination = {}) {
    const { status, type, priority, startDate, endDate, search } = filters;
    const {
      page = 1,
      limit = 10,
      sortBy = "scheduledDate",
      sortOrder = "desc",
    } = pagination;

    const query = {
      airline: new mongoose.Types.ObjectId(airlineId),
      isDeleted: false,
    };

    // Apply filters
    if (status) query.status = status;
    if (type) query.type = type;
    if (priority) query.priority = priority;

    if (startDate || endDate) {
      query.scheduledDate = {};
      if (startDate) query.scheduledDate.$gte = new Date(startDate);
      if (endDate) query.scheduledDate.$lte = new Date(endDate);
    }

    if (search) {
      query.$or = [
        { "assignedTo.engineer": { $regex: search, $options: "i" } },
        { "assignedTo.company": { $regex: search, $options: "i" } },
        { notes: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;
    const sortOptions = { [sortBy]: sortOrder === "desc" ? -1 : 1 };

    const [data, total] = await Promise.all([
      Maintenance.find(query)
        .populate("aircraft", "registration model manufacturer")
        .populate("createdBy", "name email")
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean(),
      Maintenance.countDocuments(query),
    ]);

    return {
      data,
      pagination: {
        page: parseInt(page),
        limit: parseInt(limit),
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page * limit < total,
        hasPrevPage: page > 1,
      },
    };
  }

  async getMaintenanceSummary(airlineId) {
    const pipeline = [
      { $match: { airline: new mongoose.Types.ObjectId(airlineId), isDeleted: false } },
      {
        $group: {
          _id: null,
          totalMaintenance: { $sum: 1 },
          completedCount: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          inProgressCount: {
            $sum: { $cond: [{ $eq: ["$status", "in_progress"] }, 1, 0] },
          },
          scheduledCount: {
            $sum: { $cond: [{ $eq: ["$status", "scheduled"] }, 1, 0] },
          },
          delayedCount: {
            $sum: { $cond: [{ $eq: ["$status", "delayed"] }, 1, 0] },
          },
          totalCost: { $sum: "$cost.actual" },
          totalEstimatedCost: { $sum: "$cost.estimated" },
          avgDuration: { $avg: "$duration" },
          criticalPriority: {
            $sum: { $cond: [{ $eq: ["$priority", "critical"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          _id: 0,
          totalMaintenance: 1,
          completedCount: 1,
          inProgressCount: 1,
          scheduledCount: 1,
          delayedCount: 1,
          totalCost: { $ifNull: ["$totalCost", 0] },
          totalEstimatedCost: { $ifNull: ["$totalEstimatedCost", 0] },
          avgDuration: { $ifNull: ["$avgDuration", 0] },
          criticalPriority: 1,
          completionRate: {
            $multiply: [
              {
                $divide: [
                  "$completedCount",
                  { $max: ["$totalMaintenance", 1] },
                ],
              },
              100,
            ],
          },
        },
      },
    ];

    const result = await Maintenance.aggregate(pipeline);
    return (
      result[0] || {
        totalMaintenance: 0,
        completedCount: 0,
        inProgressCount: 0,
        scheduledCount: 0,
        delayedCount: 0,
        totalCost: 0,
        totalEstimatedCost: 0,
        avgDuration: 0,
        criticalPriority: 0,
        completionRate: 0,
      }
    );
  }

  async findByStatus(airlineId, status) {
    return await Maintenance.find({
      airline: new mongoose.Types.ObjectId(airlineId),
      status,
      isDeleted: false,
    })
      .populate("aircraft", "registration model")
      .sort({ scheduledDate: 1 })
      .lean();
  }

  async getCostAnalysis(airlineId) {
    const pipeline = [
      { $match: { airline: new mongoose.Types.ObjectId(airlineId), isDeleted: false } },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 },
          totalActualCost: { $sum: "$cost.actual" },
          totalEstimatedCost: { $sum: "$cost.estimated" },
          avgDuration: { $avg: "$duration" }
        }
      },
      {
        $project: {
          type: "$_id",
          count: 1,
          totalActualCost: { $ifNull: ["$totalActualCost", 0] },
          totalEstimatedCost: { $ifNull: ["$totalEstimatedCost", 0] },
          avgDuration: { $ifNull: ["$avgDuration", 0] },
          costVariance: {
            $subtract: [
              { $ifNull: ["$totalActualCost", 0] },
              { $ifNull: ["$totalEstimatedCost", 0] }
            ]
          }
        }
      },
      { $sort: { totalActualCost: -1 } }
    ];

    return await Maintenance.aggregate(pipeline);
  }
}

module.exports = new MaintenanceRepository();