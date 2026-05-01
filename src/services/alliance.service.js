const { StatusCodes } = require("http-status-codes");
const AllianceRepository = require("../repositories/alliance.repository");

class AllianceService {
  async createAlliance(data) {
    try {
      const alliance = await AllianceRepository.createAlliance(data);
      return alliance;
    } catch (error) {
      // Handle duplicate key error (MongoDB)
      if (error.code === 11000) {
        const err = new Error("Alliance code already exists");
        err.statusCode = 409;
        throw err;
      }

      throw error;
    }
  }
  async getAllAlliances(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const alliances = await AllianceRepository.getAllAlliance(skip, limit);
      const total = await AllianceRepository.countUsers();
      if (alliances == 0 || alliances.length == 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "No Alliance Found",
        });
      }
      return {
        data: alliances,
        pagination: {
          total,
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error in getAllAlliance services",
        error,
      });
    }
  }

  async getAllAllianceById(id) {
    try {
      const getId = await AllianceRepository.getAllAllianceById(id);
      return getId;
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error in getAllianceById",
        error,
      });
    }
  }

  async updateAllianceById(allianceId, data) {
    try {
      return await AllianceRepository.updateUserById(allianceId, data);
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error in updateAllianceById service",
        error,
      });
    }
  }

  async deleteById(id) {
    try {
      const allianceId = AllianceRepository.deleteById(id);

      if (!allianceId) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "ID Not Found",
        });
      }
      return allianceId;
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error in deleteById service",
        error,
      });
    }
  }

  async updateAllianceStatus(allianceId, status) {
    try {
      // 1️⃣ Validate ID
      if (!allianceId) {
        throw new Error("Alliance ID is required");
      }

      // 2️⃣ Validate status
      if (!status) {
        throw new Error("Status is required");
      }

      const update = await AllianceRepository.updateStatus(allianceId, status);

      if (!update) {
        throw new Error("Alliance not found");
      }

      return update;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AllianceService();
