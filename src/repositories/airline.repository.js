const { Airline } = require("../models");

class AirlinRepository {
  createAirline(data) {
    return Airline.create(data);
  }
  findByCode(code) {
    return Airline.findOne({ code });
  }
  countAirlines() {
    return Airline.countDocuments();
  }

  getAirlines(skip, limit) {
    return Airline.find().skip(skip).limit(limit);
  }
  getAirlineById(id) {
    return Airline.findById(id);
  }
}

module.exports = new AirlinRepository();
