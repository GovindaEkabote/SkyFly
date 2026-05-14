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
}

module.exports = new AircraftController();
