const { StatusCodes } = require("http-status-codes");
const AirlineRepository = require("../repositories/airline.repository");
const allianceRepository = require("../repositories/alliance.repository");
const { AirportRepository } = require("../repositories/index");

class Airport {
  async createAirport(data) {
    try {
      const { code, name, city, country, coordinates, terminals } = data;

      if (!code || !name || !city || !country || !coordinates || !terminals) {
        throw new Error("All fields must be provided");
      }

      const existCode = await AirportRepository.codeExist(code);

      if (existCode) {
        throw new Error("Code already exists");
      }

      const airport = await AirportRepository.createAirport(data);

      return airport;
    } catch (error) {
      throw error;
    }
  }

  async getAirportById(id) {
    try {
      const airport = await AirportRepository.getAirportById(id);
      if (!airport) {
        throw new Error("Airport not found");
      }
      return airport;
    } catch (error) {
      throw error;
    }
  }
  async getAirports(page, limit) {
    try {
      const skip = (page - 1) * limit;
      const airports = await AirportRepository.getAirports(skip, limit);
      return airports;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new Airport();
