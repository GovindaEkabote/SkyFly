const Alliance = require("../models/Schemas/allianceDetails.schema");

class AllianceRepository {
  createAlliance(data) {
    return Alliance.create(data);
  }

  findByCode(code) {
    return Alliance.findOne({ code });
  }
}

module.exports = new AllianceRepository();