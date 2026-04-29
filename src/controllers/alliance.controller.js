const { StatusCodes } = require("http-status-codes");
const AllianceService = require("../services/alliance.service");

class AllianceController {
  async createAlliance(req, res, next) {
    try {
      const alliance = await AllianceService.createAlliance(req.body);

      return res.status(StatusCodes.CREATED).json({
        success: true,
        data: alliance,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AllianceController();