const { Flight } = require("../models/index");
const { Airline } = require("../models/index");
const { Aircraft } = require("../models/index");
const { Airport } = require("../models/index");

class FlightRepository {
  async createFlight(flightData) {
    return await Flight.create(flightData); // ✅ works now
  }

  async getFlightById(flightId) {
    return await Flight.findById(flightId)
      .populate("airline")
      .populate("aircraft")
      .populate("route.origin.airport")
      .populate("route.destination.airport");
  }

  async searchFlight(query) {
    const searchRegex = new RegExp(query, "i");

    // Find matching airlines
    const airlines = await Airline.find({
      name: searchRegex,
    }).select("_id");

    // Find matching aircrafts
    const aircrafts = await Aircraft.find({
      model: searchRegex,
    }).select("_id");

    // Find matching airports
    const airports = await Airport.find({
      $or: [{ name: searchRegex }, { code: searchRegex }],
    }).select("_id");

    const airportIds = airports.map((a) => a._id);

    const flights = await Flight.find({
      $or: [
        { flightNumber: searchRegex },
        { status: searchRegex },

        { airline: { $in: airlines.map((a) => a._id) } },

        { aircraft: { $in: aircrafts.map((a) => a._id) } },

        { "route.origin.airport": { $in: airportIds } },

        { "route.destination.airport": { $in: airportIds } },
      ],
    })
      .populate("airline", "name code")
      .populate("aircraft", "model")
      .populate("route.origin.airport", "name code")
      .populate("route.destination.airport", "name code");

    return flights;
  }

  countFlights() {
    return Flight.countDocuments();
  }

  async getFlights(skip, limit) {
    return await Flight.find().skip(skip).limit(limit);
  }
}

module.exports = new FlightRepository();
