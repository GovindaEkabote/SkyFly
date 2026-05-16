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
}
module.exports = new FlightService();
