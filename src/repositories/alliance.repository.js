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

  countUsers() {
    return Alliance.countDocuments();
  }

  getAllAllianceById(id) {
    return Alliance.findById(id);
  }

  updateUserById(allianceId, data) {
    return Alliance.findByIdAndUpdate(
      allianceId,
      { $set: data },
      { new: true, runValidators: true },
    );
  }

  deleteById(id) {
    return Alliance.findByIdAndDelete(id);
  }
}

module.exports = new AllianceRepository();
