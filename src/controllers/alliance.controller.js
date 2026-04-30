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

  async getAlliances(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;

      const alliances = await AllianceService.getAllAlliances(page, limit);

      return res.status(StatusCodes.OK).json({
        success: true,
        data: alliances,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error in getAllAlliance services",
        error,
      });
    }
  }

  async getAlliance(req, res, next) {
    try {
      const { id } = req.params;
      const user = await AllianceService.getAllAllianceById(id);
      if (!user) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Alliance Not Found",
        });
      }
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Alliance fetched successfully",
        data: user,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error in getAllAlliance services",
        error,
      });
    }
  }
}

module.exports = new AllianceController();
