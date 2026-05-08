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
  deleteAirline(id) {
    return Airline.findByIdAndDelete(id);
  }
  updateAirline(airlineId, data) {
    return Airline.findByIdAndUpdate(
      airlineId,
      { $set: data },
      { new: true, runValidators: true },
    );
  }

  updateAirlineStatus(airlineId, status) {
    return Airline.findByIdAndUpdate(
      airlineId,
      { $set: { status } },
      { new: true, runValidators: true },
    );
  }
  removeFromAlliance(airlineId) {
    return Airline.findByIdAndUpdate(
      airlineId,
      { $unset: { allianceDetails: 1 } },
      { new: true, runValidators: true },
    );
  }

  addAllaiance(airlineId, allianceId) {
    return Airline.findByIdAndUpdate(
      airlineId,
      {
        $set: {
          allianceDetails: allianceId,
        },
      },
      {
        new: true,
        runValidators: true,
      },
    );
  }
  searchAirlines(query) {
    return Airline.find({
      $or: [
        { name: { $regex: query, $options: "i" } },
        { code: { $regex: query, $options: "i" } },
        { country: { $regex: query, $options: "i" } },
      ],
    });
  }

  findByAllianceId(allianceId) {
    return (
      Airline.find({
        allianceDetails: allianceId,
        isDeleted: false,
        status: { $ne: "inactive" },
      })
        .populate("allianceDetails", "name code description")
        // .populate("hubs", "name code city country")
        .sort({ name: 1 })
    );
  }

  getAllAirlinesWithAlliance() {
    return Airline.aggregate([
      {
        $match: {
          isDeleted: false,
          allianceDetails: { $exists: true, $ne: null },
        },
      },
      {
        $lookup: {
          from: "alliances",
          localField: "allianceDetails",
          foreignField: "_id",
          as: "allianceInfo",
        },
      },
      {
        $unwind: {
          path: "$allianceInfo",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $group: {
          _id: "$allianceInfo._id",
          allianceName: { $first: "$allianceInfo.name" },
          allianceCode: { $first: "$allianceInfo.code" },
          memberCount: { $sum: 1 },
          airlines: {
            $push: {
              id: "$_id",
              code: "$code",
              name: "$name",
              country: "$country",
              status: "$status",
            },
          },
        },
      },
      {
        $sort: { allianceName: 1 },
      },
    ]);
  }
}

module.exports = new AirlinRepository();
