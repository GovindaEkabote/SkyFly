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
}

module.exports = new AllianceService();