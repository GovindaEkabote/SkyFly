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

  getAircraftById(id) {
    return Aircraft.findById(id);
  }

  updateAircraft(id, data) {
    return Aircraft.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );
  }

  deleteAircraft(id) {
    return Aircraft.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true },
    );
  }
}

module.exports = new AircraftRepository();
