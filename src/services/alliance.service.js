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
}

module.exports = new AllianceService();
