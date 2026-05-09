const {Airport} = require("../models/index");

class AirportRepository {
  createAirport(data) {
    return Airport.create(data);
  }
  codeExist(code) {
    return Airport.findOne({ code });
  }
  getAirportById(id){
    return Airport.findById(id);
  }

  getAirports(skip, limit) {
    return Airport.find().skip(skip).limit(limit);
  }

}

module.exports = new AirportRepository();
