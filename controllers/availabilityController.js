const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");

exports.getAvailableDrivers = async (req, res, next) => {
  try {
    const { nationality, languages } = req.query;
    const drivers = await Driver.find({
      nationality,
      languages: { $in: [languages] },
      status: "active",
      licenseStatus: "valid",
    }).populate({
      path: "vehicle",
    });
    const availableDrivers = drivers.filter((driver) => driver.vehicle);
    res.status(200).json(availableDrivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVehiclesWithExpiredLicense = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find({ licenseStatus: "expired" });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDriversWithExpiredLicense = async (req, res, next) => {
  try {
    const drivers = await Driver.find({ licenseStatus: "expired" });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDriversWithVehicleExpiredLicense = async (req, res, next) => {
  try {
    const drivers = await Driver.find().populate({
      path: "vehicle",
      match: { licenseStatus: "expired" },
    });

    const driversWithExpiredVehicleLicense = drivers.filter(
      (driver) => driver.vehicle
    );
    res.status(200).json(driversWithExpiredVehicleLicense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
