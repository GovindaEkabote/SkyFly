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

  findAirportByStatus(status) {
    return Airport.find({ status: { $eq: status  } });
  }

  findAirportByCode(code) {
    return Airport.find({ code: { $eq: code } });
  }

  searchAirports(query) {
    return Airport.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { city: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    });
  }
}

module.exports = new AirportRepository();
