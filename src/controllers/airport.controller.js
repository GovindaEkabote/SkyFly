const { StatusCodes } = require("http-status-codes");
const { AirportService } = require("../services/index");

class AirportController {
  async createAirportController(req, res, next) {
    try {
      const airport = await AirportService.createAirport(req.body);
      return res.status(StatusCodes.CREATED).json({
        success: true,
        data: airport,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAirportByIdController(req, res, next) {
    try {
      const { id } = req.params;
      const airport = await AirportService.getAirportById(id);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: airport,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async getAirportsController(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const airports = await AirportService.getAirports(page, limit);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: airports,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
}

module.exports = new AirportController();
