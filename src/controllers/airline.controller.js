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
}

module.exports = new AirlineController();
