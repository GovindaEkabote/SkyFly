const { Airline } = require("../models");

class AirlinRepository {
  createAirline(data) {
    return Airline.create(data);
  }
  findByCode(code) {
    return Airline.findOne({ code });
  }
  getAirlines(skip, limit) {
    return Airline.find().skip(skip).limit(limit);
  }
}

module.exports = new AirlinRepository();
