const { StatusCodes } = require("http-status-codes");
const { aircraftService } = require("../services/index");

class AircraftController {
  async create(req, res, next) {
    try {
      const aircraft = await aircraftService.createAircraft(req.body);
      res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Aircraft created successfully",
        data: aircraft,
      });
    } catch (error) {
      next(error);
    }
  }

  async getAll(req, res, next) {
    try {
      const { page = 1, limit = 10 } = req.query;
      const result = await aircraftService.getAllAircraft(page, limit);
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Aircraft retrieved successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const { id } = req.params;
      const aircraft = await aircraftService.getAircraftById(id);
      if (!aircraft) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "Aircraft not found",
        });
      }
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Aircraft retrieved successfully",
        data: aircraft,
      });
    } catch (error) {
      next(error);
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      const aircraft = await aircraftService.updateAircraft(id, req.body);
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Aircraft updated successfully",
        data: aircraft,
      });
    } catch (error) {
      next(error);
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params;
      const aircraft = await aircraftService.deleteAircraft(id);
      res.status(StatusCodes.OK).json({
        success: true,
        message: "Aircraft deleted successfully",
        data: aircraft,
      });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new AircraftController();
