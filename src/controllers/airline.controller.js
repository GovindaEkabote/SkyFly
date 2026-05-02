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

  async updateAirline(req, res, next) {
    try {
      const { airlineId } = req.params;
      const data = req.body;
      console.log(airlineId);
      console.log(data);
      if (!airlineId) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "ID Not Found",
        });
      }
      const updateAirline = await AirlineService.updateAirline(airlineId, data);
      if (!updateAirline) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Airline not found",
        });
      }
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Airline details updated successfully",
        data: updateAirline,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error,
      });
    }
  }

  async getAirlineById(req, res, next) {
    try {
      const { id } = req.params;
      const airline = await AirlineService.getAirlineById(id);
      if (!airline) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Airline Not Found",
        });
      }
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Airline fetched successfully",
        data: airline,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error,
      });
    }
  }
}

module.exports = new AirlineController();
