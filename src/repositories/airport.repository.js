const { Airport } = require("../models/index");

class AirportRepository {
  createAirport(data) {
    return Airport.create(data);
  }
  codeExist(code) {
    return Airport.findOne({ code });
  }
  getAirportById(id) {
    return Airport.findById(id);
  }

  getAirports(skip, limit) {
    return Airport.find().skip(skip).limit(limit);
  }

  updateAirport(id, data) {
    return Airport.findByIdAndUpdate(
      id,
      { $set: data },
      { new: true, runValidators: true },
    );
  }

  deleteAirport(id) {
    return Airport.findByIdAndDelete(id);
  }

  updateAirportStatus(id, status) {
    return Airport.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true, runValidators: true },
    );
  }
  
}

module.exports = new AirportRepository();
