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

  async updateAirportById(req, res, next) {
    try {
      const { id } = req.params;
      const updatedAirport = await AirportService.updateAirportById(
        id,
        req.body,
      );

      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Airport updated successfully",
        data: updatedAirport,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async deleteAirportById(req, res, next) {
    try {
      const { id } = req.params;
      await AirportService.deleteAirportById(id);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Airport deleted successfully",
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ 
        success: false,
        message: error.message,
      });
    }
  }

  async updateAirportStatus(req, res, next) {
    try {
      const { id } = req.params;
      const { status } = req.body;
      const updatedAirport = await AirportService.updateAirportStatus(id, status);
      return res.status(StatusCodes.OK).json({
        success: true,
        message: "Airport status updated successfully",
        data: updatedAirport,
      });
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }
 
  async findAirportByStatus(req, res, next) {
    try {
      const { status } = req.query;
      const airports = await AirportService.findAirportByStatus(status);
      return res.status(StatusCodes.OK).json({
        success: true,
        data: airports,
      });
    }catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: error.message,
      });
    }
  }

  async findAirportByCode(req, res, next) {
    try {
      const { code } = req.query;
      const airports = await AirportService.findAirportByCode(code);
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

  async searchAirports(req, res, next) {
    try {
      const { query } = req.query;
      const airports = await AirportService.searchAirports(query);
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
