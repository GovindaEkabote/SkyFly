const mongoose = require("mongoose");
const { StatusCodes } = require("http-status-codes");
const { maintenanceRepository } = require("../repositories/index");
const {maintenanceStatus} = require("../utils");
const { Airline } = require("../models/index");

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
          totalRecords: totalRecords,
          totalPages: Math.ceil(totalRecords / limit),
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

  async updateData(id, data) {
    try {
      const updatedRecord = await maintenanceRepository.updateMaintenanceRecord(
        id,
        data,
      );
      return updatedRecord;
    } catch (error) {
      throw error;
    }
  }

  async softdelete(id) {
    try {
      const deleteRecord = await maintenanceRepository.deleteMaintenance(id);
      if (!deleteRecord) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "Maintenance not found",
        };
      }
      return deleteRecord;
    } catch (error) {
      throw error;
    }
  }

  async getAirlineMaintenances(airlineId, queryParams) {
    // Validate airline exists
    const airline = await Airline.findById(airlineId);
    if (!airline) {
      throw new Error("Airline not found");
    }

    // Extract filters from query params
    const filters = {
      status: queryParams.status,
      type: queryParams.type,
      priority: queryParams.priority,
      startDate: queryParams.startDate,
      endDate: queryParams.endDate,
      minCost: queryParams.minCost,
      maxCost: queryParams.maxCost,
    };

    // Remove undefined filters
    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key],
    );

    // Pagination params
    const pagination = {
      page: queryParams.page,
      limit: queryParams.limit,
    };

    // Get maintenance records
    const result = await maintenanceRepository.findByAirline(
      airlineId,
      filters,
      pagination,
    );

    // Get summary statistics (optional, can be separate endpoint)
    let summary = null;
    if (queryParams.includeSummary === "true") {
      summary = await maintenanceRepository.getSummaryByAirline(airlineId);
    }

    return {
      airline: {
        id: airline._id,
        name: airline.name,
        code: airline.code,
      },
      filters,
      summary,
      ...result,
    };
  }

  async getAirlineMaintenanceRecords(airlineId, queryParams) {
    // Validate airline ID
    if (!mongoose.Types.ObjectId.isValid(airlineId)) {
      throw new Error("Invalid airline ID format");
    }

    // Extract pagination parameters
    const pagination = {
      page: parseInt(queryParams.page) || 1,
      limit: Math.min(parseInt(queryParams.limit) || 10, 100), // Max 100 records
      sortBy: queryParams.sortBy || "scheduledDate",
      sortOrder: queryParams.sortOrder || "desc",
    };

    // Validate sortBy field
    const allowedSortFields = [
      "scheduledDate",
      "createdAt",
      "duration",
      "cost.actual",
    ];
    if (!allowedSortFields.includes(pagination.sortBy)) {
      pagination.sortBy = "scheduledDate";
    }

    // Extract filters
    const filters = {
      status: queryParams.status,
      type: queryParams.type,
      priority: queryParams.priority,
      startDate: queryParams.startDate,
      endDate: queryParams.endDate,
      search: queryParams.search,
    };

    // Remove undefined filters
    Object.keys(filters).forEach(
      (key) => filters[key] === undefined && delete filters[key],
    );

    // Validate enum values
    const validStatuses = [
      "scheduled",
      "in_progress",
      "completed",
      "delayed",
      "cancelled",
    ];
    if (filters.status && !validStatuses.includes(filters.status)) {
      throw new Error(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      );
    }

    const validTypes = [
      "A_check",
      "C_check",
      "engine_overhaul",
      "landing_gear",
      "avionics",
      "emergency",
      "scheduled",
    ];
    if (filters.type && !validTypes.includes(filters.type)) {
      throw new Error(`Invalid type. Must be one of: ${validTypes.join(", ")}`);
    }

    const validPriorities = ["low", "medium", "high", "critical"];
    if (filters.priority && !validPriorities.includes(filters.priority)) {
      throw new Error(
        `Invalid priority. Must be one of: ${validPriorities.join(", ")}`,
      );
    }

    // Get maintenance records
    const result = await maintenanceRepository.findByAirlineMaintenance(
      airlineId,
      filters,
      pagination,
    );

    return {
      success: true,
      data: result.data,
      pagination: result.pagination,
      filters: filters,
    };
  }

  async getMaintenanceSummary(airlineId) {
    if (!mongoose.Types.ObjectId.isValid(airlineId)) {
      throw new Error("Invalid airline ID format");
    }

    const [summary, upcomingMaintenance, costAnalysis] = await Promise.all([
      maintenanceRepository.getMaintenanceSummary(airlineId),
      maintenanceRepository.getUpcomingMaintenance(airlineId, 30),
      maintenanceRepository.getCostAnalysis(airlineId),
    ]);

    return {
      success: true,
      summary,
      upcomingCount: upcomingMaintenance.length,
      costAnalysis,
      nextMaintenanceDue: upcomingMaintenance[0] || null,
    };
  }

  async getMaintenanceByStatus(airlineId, status) {
    if (!mongoose.Types.ObjectId.isValid(airlineId)) {
      throw new Error("Invalid airline ID format");
    }

    const validStatuses = [
      maintenanceStatus.scheduled,
      maintenanceStatus.in_progress,
      maintenanceStatus.completed,
      maintenanceStatus.delayed,
      maintenanceStatus.cancelled,
    ];
    if (!validStatuses.includes(status)) {
      throw new Error(
        `Invalid status. Must be one of: ${validStatuses.join(", ")}`,
      );
    }

    const records = await maintenanceRepository.findByStatus(airlineId, status);

    return {
      success: true,
      status,
      count: records.length,
      data: records,
    };
  }

  async exportMaintenanceRecords(airlineId, filters = {}) {
    const result = await maintenanceRepository.findByAirline(
      airlineId,
      filters,
      { limit: 1000 },
    );

    const csvData = result.data.map((record) => ({
      Aircraft: record.aircraft?.registration || "N/A",
      Model: record.aircraft?.model || "N/A",
      Type: record.type,
      Status: record.status,
      Priority: record.priority,
      "Scheduled Date": record.scheduledDate?.toISOString().split("T")[0],
      "Completion Date":
        record.completionDate?.toISOString().split("T")[0] || "Pending",
      "Duration (hours)": record.duration || 0,
      "Actual Cost": record.cost?.actual || 0,
      "Estimated Cost": record.cost?.estimated || 0,
      Engineer: record.assignedTo?.engineer || "Not assigned",
    }));

    return {
      success: true,
      data: csvData,
      totalRecords: result.pagination.total,
    };
  }
}

module.exports = new MaintenanceService();