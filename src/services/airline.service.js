const { StatusCodes } = require("http-status-codes");
const AirlineRepository = require("../repositories/airline.repository");
const allianceRepository = require("../repositories/alliance.repository");
const { default: mongoose } = require("mongoose");

class AirlineService {
  async createAirline(data) {
    try {
      const { name, code, allianceDetails, country } = data;
      if (!name || !code || !allianceDetails || !country) {
        throw new Error("All required fields must be provided");
      }
      const existCode = await AirlineRepository.findByCode(code);
      if (existCode) {
        throw new Error("code already exist");
      }
      const existAlliance =
        await allianceRepository.getAllAllianceById(allianceDetails);
      if (!existAlliance) {
        throw new Error("Invalid alliance ID");
      }
      const airline = await AirlineRepository.createAirline(data);
      return airline;
    } catch (error) {
      throw error;
    }
  }

  async getAirlines(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const airlines = await AirlineRepository.getAirlines(skip, limit);
      const total = await AirlineRepository.countAirlines();
      if (airlines == 0 || airlines.length == 0) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "No Airlines Found",
        });
      }
      return {
        data: airlines,
        pagination: {
          page: Number(page),
          limit: Number(limit),
          totalPages: Math.ceil(total / limit),
          hasNext: page * limit < total,
          hasPrev: page > 1,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  async getAirlineById(id) {
    try {
      const getId = await AirlineRepository.getAirlineById(id);
      if (!getId) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "ID Not Found",
        });
      }
      return getId;
    } catch (error) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Error in getAirlineById",
        error,
      });
    }
  }

  async updateAirline(airlineId, data) {
    try {
      return await AirlineRepository.updateAirline(airlineId, data);
    } catch (error) {
      throw error;
    }
  }

  async deleteAirline(id) {
    try {
      const deleteAirline = AirlineRepository.deleteAirline(id);
      if (!deleteAirline) {
        return res.status(StatusCodes.NOT_FOUND).json({
          success: false,
          message: "ID Not Found",
        });
      }
      return deleteAirline;
    } catch (error) {
      error;
    }
  }

  async updateStatus(airlineId, status) {
    try {
      if (!airlineId) {
        throw new Error("Airline ID is required");
      }
      if (!status) {
        throw new Error("Status is required");
      }
      const update = await AirlineRepository.updateAirlineStatus(
        airlineId,
        status,
      );
      if (!update) {
        throw new Error("Airline Not found");
      }
      return update;
    } catch (error) {
      throw error;
    }
  }

  async removeAllianceFromAirline(airlineId) {
    try {
      if (!airlineId) {
        throw new Error("Airline ID is required");
      }
      const existingAirline = await AirlineRepository.getAirlineById(airlineId);
      if (!existingAirline) {
        throw new Error("Airline not found");
      }
      if (!existingAirline.allianceDetails) {
        throw new Error("NO_ALLIANCE_TO_REMOVE");
      }
      const removedAllianceName =
        existingAirline.allianceDetails?.name || "Unknown";
      const updatedAirline =
        await AirlineRepository.removeFromAlliance(airlineId);
      return updatedAirline;
    } catch (error) {
      throw error;
    }
  }

  async addAllianceToAirline(airlineId, allianceId) {
    try {
      if (!airlineId) {
        throw new Error("Airline ID is required");
      }
      if (!allianceId) {
        throw new Error("Alliance ID is required");
      }

      const updatedAirline = await AirlineRepository.addAllaiance(
        airlineId,
        allianceId,
      );
      return updatedAirline;
    } catch (error) {
      throw error;
    }
  }

  async addHubToAirline(airlineId, airportId) {
    try {
      if (!airlineId) {
        throw new Error("Airline ID is required");
      }
      if (!airportId) {
        throw new Error("Airport ID is required");
      }

      const updatedAirline = await AirlineRepository.addHubToAirline(
        airlineId,
        airportId
      );
      return updatedAirline;
    } catch (error) {
      throw error;
    }
  }

  async searchAirlines(query) {
    if (!query || query.trim() === "") {
      throw new Error("Search query cannot be empty");
    }
    const result = await AirlineRepository.searchAirlines(query);
    if (result.length === 0) {
      throw new Error("No airlines found matching the search criteria");
    }
    return result;
  }

  async findByAllianceId(allianceId) {
    if (!allianceId) {
      throw new Error("Alliance ID is required");
    }

    const airlines = await AirlineRepository.findByAllianceId(allianceId);

    if (!airlines || airlines.length === 0) {
      return {
        success: false,
        message: "No airlines found for the given alliance ID",
        count: 0,
        data: [],
      };
    }

    const allianceInfo = airlines[0].allianceDetails || null;

    return {
      alliance: allianceInfo
        ? {
            id: allianceInfo._id,
            name: allianceInfo.name,
            code: allianceInfo.code,
            description: allianceInfo.description,
          }
        : null,

      totalAirlines: airlines.length,

      airlines: airlines.map((airline) => ({
        id: airline._id,
        code: airline.code,
        name: airline.name,
        country: airline.country,
        status: airline.status,

        hubs: airline.hubs.map((hub) => ({
          code: hub.code,
          name: hub.name,
          city: hub.city,
          country: hub.country,
        })),

        contactInfo: airline.contactInfo,
        headquarters: airline.headquarters,
      })),
    };
  }

  async getAllAirlinesWithAlliance() {
    try {
      const alliancesWithAirlines =
        await AirlineRepository.getAllAirlinesWithAlliance();

      if (!alliancesWithAirlines || alliancesWithAirlines.length === 0) {
        return {
          message: "No airlines found with alliance membership",
          totalAlliances: 0,
          totalAirlines: 0,
          alliances: [],
        };
      }

      // Calculate total airlines across all alliances
      const totalAirlines = alliancesWithAirlines.reduce(
        (sum, alliance) => sum + alliance.memberCount,
        0,
      );

      // Format the response with additional statistics
      const formattedAlliances = alliancesWithAirlines.map((alliance) => ({
        allianceId: alliance._id,
        allianceName: alliance.allianceName,
        allianceCode: alliance.allianceCode,
        memberCount: alliance.memberCount,
        airlines: alliance.airlines.map((airline) => ({
          airlineId: airline.id,
          code: airline.code,
          name: airline.name,
          country: airline.country,
          status: airline.status,
          // Add airline age or additional info if needed
          isActive: airline.status === "active",
        })),
        // Calculate active members count for each alliance
        activeMembers: alliance.airlines.filter((a) => a.status === "active")
          .length,
        inactiveMembers: alliance.airlines.filter((a) => a.status !== "active")
          .length,
      }));

      return {
        summary: {
          totalAlliances: formattedAlliances.length,
          totalAirlines: totalAirlines,
          averageAirlinesPerAlliance: (
            totalAirlines / formattedAlliances.length
          ).toFixed(2),
          generatedAt: new Date().toISOString(),
        },
        alliances: formattedAlliances,
      };
    } catch (error) {
      throw new Error(`Error fetching airlines by alliance: ${error.message}`);
    }
  }

  async getAllianceWithAirlinesById(allianceId) {
    if (!allianceId || !mongoose.Types.ObjectId.isValid(allianceId)) {
      throw new Error("Invalid alliance ID format");
    }

    const alliances = await AirlineRepository.getAllAirlinesWithAlliance();

    const targetAlliance = alliances.find(
      (alliance) => alliance._id.toString() === allianceId.toString(),
    );

    if (!targetAlliance) {
      return {
        message: "No alliance found with the specified ID",
        allianceId: allianceId,
        exists: false,
      };
    }

    return {
      exists: true,
      alliance: {
        id: targetAlliance._id,
        name: targetAlliance.allianceName,
        code: targetAlliance.allianceCode,
        memberCount: targetAlliance.memberCount,
        airlines: targetAlliance.airlines.map((airline) => ({
          id: airline.id,
          code: airline.code,
          name: airline.name,
          country: airline.country,
          status: airline.status,
          // Add additional details from database if needed
          canBeExpanded: true,
        })),
        statistics: {
          totalMembers: targetAlliance.memberCount,
          activeMembers: targetAlliance.airlines.filter(
            (a) => a.status === "active",
          ).length,
          countriesRepresented: [
            ...new Set(targetAlliance.airlines.map((a) => a.country)),
          ].length,
        },
      },
    };
  }

  async getAllianceMemberSummary() {
    const alliances = await AirlineRepository.getAllAirlinesWithAlliance();

    if (!alliances || alliances.length === 0) {
      return {
        message: "No alliance data available",
        totalAlliances: 0,
        totalAirlines: 0,
      };
    }

    // Prepare summary data for dashboard/statistics
    const summary = {
      totalAlliances: alliances.length,
      totalAirlines: alliances.reduce((sum, a) => sum + a.memberCount, 0),
      largestAlliance: alliances.reduce((largest, current) =>
        current.memberCount > largest.memberCount ? current : largest,
      ),
      smallestAlliance: alliances.reduce((smallest, current) =>
        current.memberCount < smallest.memberCount ? current : smallest,
      ),
      allianceNames: alliances.map((a) => ({
        name: a.allianceName,
        code: a.allianceCode,
        members: a.memberCount,
      })),
    };

    return summary;
  }


}
module.exports = new AirlineService();
