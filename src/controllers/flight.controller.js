const { StatusCodes } = require("http-status-codes");
const { flightService } = require("../services/index");

class FlightController {
  async createFlight(req, res, next) {
    try {
      const flightData = req.body;
      const newFlight = await flightService.createFlight(flightData);
      res.status(StatusCodes.CREATED).json(newFlight);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }
}
module.exports = new FlightController();
