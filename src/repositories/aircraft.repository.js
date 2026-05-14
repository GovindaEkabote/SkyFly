const { Aircraft } = require("../models/index");

class AircraftRepository {
  createAircraft(data) {
    return Aircraft.create(data);
  }

  findAircraftByRegistration(registration) {
    return Aircraft.findOne({ registration, isDeleted: false });
  }

  countAircraft() {
    return Aircraft.countDocuments({ isDeleted: false });
  }

  findAircraft(skip, limit) {
    return Aircraft.find({ isDeleted: false }).skip(skip).limit(limit);
  }
}

module.exports = new AircraftRepository();
