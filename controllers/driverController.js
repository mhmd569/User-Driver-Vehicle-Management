const { validationResult } = require("express-validator");
const Driver = require("../models/Driver");
const hashPassword = require("../utils/hashPassword");

exports.createDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { password, ...rest } = req.body;

    const existingDriver = await Driver.findOne({
      $or: [{ username: rest.username }, { employeeId: rest.employeeId }],
    });

    if (existingDriver) {
      const conflictField =
        existingDriver.username === rest.username ? "username" : "employee Id";
      return res
        .status(400)
        .json({ message: `${conflictField} already exists` });
    }

    // Check if the vehicle already exists and is assigned to a driver
    if (rest.vehicle) {
      const existingVehicle = await Driver.findOne({ vehicle: rest.vehicle });
      if (existingVehicle) {
        return res
          .status(400)
          .json({ message: "This vehicle already has an assigned driver" });
      }
    }

    const hashedPassword = await hashPassword(password);
    const driver = new Driver({
      password: hashedPassword,
      profileImage: req.file.path,
      licenseStatus: req.body.licenseStatus.toLowerCase(),
      ...rest,
    });
    await driver.save();
    res.status(201).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllDrivers = async (req, res, next) => {
  try {
    const drivers = await Driver.find();
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDriverById = async (req, res, next) => {
  try {
    const driver = await Driver.findById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateDriver = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { password, ...rest } = req.body;

    const existingDriver = await Driver.findOne({
      $or: [{ username: rest.username }, { employeeId: rest.employeeId }],
    });

    if (existingDriver && existingDriver._id != req.params.id) {
      const conflictField =
        existingDriver.username === rest.username ? "username" : "employee Id";
      return res
        .status(400)
        .json({ message: `${conflictField} already exists` });
    }

    if (password) {
      rest.password = await hashPassword(password);
    }
    const driver = await Driver.findByIdAndUpdate(req.params.id, rest, {
      new: true,
    });
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findByIdAndDelete(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json({ message: "Driver deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getDriversWithVehicles = async (req, res, next) => {
  try {
    const drivers = await Driver.find().populate("vehicle");

    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
