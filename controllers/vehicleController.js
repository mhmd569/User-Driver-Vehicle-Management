const { validationResult } = require("express-validator");
const Vehicle = require("../models/Vehicle");

exports.createVehicle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const oldVehicle = await Vehicle.findOne({
      plateNumber: req.body.plateNumber,
    });
    if (oldVehicle) {
      return res.status(400).json({ message: "Vehicle already exists" });
    }
    const vehicleData = {
      ...req.body,
      vehicleImage: req.file.path,
      licenseStatus: req.body.licenseStatus.toLowerCase(),
    };
    const vehicle = new Vehicle(vehicleData);
    await vehicle.save();
    res.status(201).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllVehicles = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find();
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVehicleById = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findById(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateVehicle = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const vehicleData = { ...req.body };
    if (req.file) {
      vehicleData.vehicleImage = req.file.path;
    }
    const vehicle = await Vehicle.findByIdAndUpdate(
      req.params.id,
      vehicleData,
      {
        new: true,
      }
    );
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json(vehicle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteVehicle = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findByIdAndDelete(req.params.id);
    if (!vehicle) {
      return res.status(404).json({ message: "Vehicle not found" });
    }
    res.status(200).json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getVehiclesWithDrivers = async (req, res, next) => {
  try {
    const vehicles = await Vehicle.find().populate("driver");
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
