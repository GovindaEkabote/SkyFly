const { flightRepository } = require("../repositories/index");

class FlightService {
  async createFlight(flightData) {
    return await flightRepository.createFlight(flightData);
  }

  async getFlightById(flightId) {
    return await flightRepository.getFlightById(flightId);
  }

  async searchFlight(query) {
    if (!query?.trim()) {
      throw new Error("Query parameter is required");
    }

    const flights = await flightRepository.searchFlight(query);

    if (flights.length === 0) {
      throw new Error("No flights found matching the query");
    }

    return flights;
  }

  async getFlights(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const totalFlights = await flightRepository.countFlights();
    const flights = await flightRepository.getFlights(skip, limit);
    return {
      data: flights,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalFlights / limit),
        hasNext: page * limit < totalFlights,
        hasPrev: page > 1,
      },
    };
  }

  async assignAircraft(flightId, aircraftId) {
    const flight = await flightRepository.getFlightById(flightId);
    if (!flight) {
      throw new Error("Flight not found");
    }
    if (!aircraftId) {
      throw new Error("Aircraft ID is required");
    }
    return await flightRepository.assignAircraft(flightId, aircraftId);
  }

  async updateStatus(flightId, status) {
    const flight = await flightRepository.getFlightById(flightId);
    if (!flight) {
      throw new Error("Flight not found");
    }
    if (!status) {
      throw new Error("Status is required");
    }
    return await flightRepository.updateFlightStatus(flightId, status);
  }
}
module.exports = new FlightService();
