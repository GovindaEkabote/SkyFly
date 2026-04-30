const { User } = require("../models");
const Alliance = require("../models/Schemas/allianceDetails.schema");

class AllianceRepository {
  createAlliance(data) {
    return Alliance.create(data);
  }

  findByCode(code) {
    return Alliance.findOne({ code });
  }

  getAllAlliance(skip, limit) {
    return Alliance.find().skip(skip).limit(limit);
  }

  countUsers(){
    return User.countDocuments()
  }

  getAllAllianceById(id){
    return Alliance.findById(id);
  }
}

module.exports = new AllianceRepository();
