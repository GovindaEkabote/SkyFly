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

  async getFlightById(req, res, next) {
    try {
      const { id } = req.params;
      const flight = await flightService.getFlightById(id);
      if (!flight) {
        return res
          .status(StatusCodes.NOT_FOUND)
          .json({ error: "Flight not found" });
      }
      res.status(StatusCodes.OK).json(flight);
    } catch (error) {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ error: error.message });
    }
  }

async searchFlights(req, res) {
  try {
    const { query } = req.query;

    const flights = await flightService.searchFlight(query);

    return res.status(StatusCodes.OK).json(flights);

  } catch (error) {

    if (error.message === "Query parameter is required") {
      return res.status(StatusCodes.BAD_REQUEST).json({
        error: error.message,
      });
    }

    if (error.message === "No flights found matching the query") {
      return res.status(StatusCodes.NOT_FOUND).json({
        error: error.message,
      });
    }

    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      error: error.message,
    });
  }
}
}
module.exports = new FlightController();
