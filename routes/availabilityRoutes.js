const express = require("express");
const router = express.Router();
const Driver = require("../models/Driver");
const Vehicle = require("../models/Vehicle");
const DriverVehicle = require("../models/DriverVehicle");

router.get("/active-driver", async (req, res) => {
  const {
    nationality,
    language,
    make,
    model,
    category,
    color,
    serviceType,
    numberOfSeats,
  } = req.query;
  try {
    const drivers = await Driver.find({
      nationality,
      language,
      licenseValid: true,
    });

    const driverIds = drivers.map((driver) => driver._id);

    const driverVehicles = await DriverVehicle.find({
      driver: { $in: driverIds },
    }).populate("vehicle");

    const availableDrivers = driverVehicles.filter((dv) => {
      const vehicle = dv.vehicle;
      return (
        vehicle.licenseValid &&
        vehicle.make === make &&
        vehicle.model === model &&
        vehicle.category === category &&
        vehicle.color === color &&
        vehicle.serviceType === serviceType &&
        vehicle.numberOfSeats === numberOfSeats
      );
    });

    res.status(200).json(availableDrivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/expired-vehicles", async (req, res) => {
  try {
    const vehicles = await Vehicle.find({ licenseValid: false });
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/expired-drivers", async (req, res) => {
  try {
    const drivers = await Driver.find({ licenseValid: false });
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/drivers-with-expired-vehicles", async (req, res) => {
  try {
    const driverVehicles = await DriverVehicle.find().populate("vehicle");
    const driversWithExpiredVehicles = driverVehicles
      .filter((dv) => !dv.vehicle.licenseValid)
      .map((dv) => dv.driver);
    res.status(200).json(driversWithExpiredVehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
