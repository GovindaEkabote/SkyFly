const { StatusCodes } = require("http-status-codes");
const { aircraftRepository } = require("../repositories/index");

class AircraftService {
  async createAircraft(data) {
    try {
      const existingAircraft =
        await aircraftRepository.findAircraftByRegistration(data.registration);
      if (existingAircraft) {
        throw {
          status: StatusCodes.CONFLICT,
          message: "Aircraft with this registration already exists",
        };
      }
      return await aircraftRepository.createAircraft(data);
    } catch (error) {
      throw error;
    }
  }

  async getAllAircraft(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const aircraft = await aircraftRepository.findAircraft(skip, limit);
      const totalAircraft = await aircraftRepository.countAircraft();
      if (aircraft.length === 0) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "No aircraft found",
        };
      }
      return {
        data: aircraft,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(totalAircraft / limit),
          hasNext: page * limit < totalAircraft,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getAircraftById(id) {
    try {
      const aircraft = await aircraftRepository.getAircraftById(id);
      if (!aircraft) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "Aircraft not found",
        };
      }
      return aircraft;
    } catch (error) {
      throw error;
    }
  }

  async updateAircraft(id, data) {
    try {
      const updatedAircraft = await aircraftRepository.updateAircraft(id, data);
      if (!updatedAircraft) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "Aircraft not found",
        };
      }
      return updatedAircraft;
    } catch (error) {
      throw error;
    }
  }

  async deleteAircraft(id) {
    try {
      const deletedAircraft = await aircraftRepository.deleteAircraft(id);
      if (!deletedAircraft) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "Aircraft not found",
        };
      }
      return deletedAircraft;
    } catch (error) {
      throw error;
    }
  }

  async getAircraftFleet(id) {
    try {
      const fleetAircraft = await aircraftRepository.getAircraftFleet(id);
      if (fleetAircraft.length === 0) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "No aircraft found for this fleet",
        };
      }
      return fleetAircraft;
    } catch (error) {
      throw error;
    }
  }

  async updateAircraftStatus(id, status) {
    try {
      const updatedAircraft = await aircraftRepository.updateAircraftStatus(id, status);
      if (!updatedAircraft) {
        throw {
          status: StatusCodes.NOT_FOUND,
          message: "Aircraft not found",
        };
      }
      return updatedAircraft;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new AircraftService();
