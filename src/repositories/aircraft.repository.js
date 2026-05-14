const { Aircraft } = require("../models/index");

class AircraftRepository {
  createAircraft(data) {
    return Aircraft.create(data);
  }

  findAircraftByRegistration(registration) {
    return Aircraft.findOne({ registration, isDeleted: false });
  }

  
}

module.exports = new AircraftRepository();
