const { StatusCodes } = require("http-status-codes");
const AirlineService = require("../services/airline.service");

class AirlineController {
  async createAirline(req, res, next) {
    try {
      const airline = await AirlineService.createAirline(req.body);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        data: airline,
      });
    } catch (error) {
      return res.status(error.statusCode || 500).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAirlines(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const airlines = await AirlineService.getAirlines(page, limit);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: airlines,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AirlineController();
