const DriverVehicle = require('../models/DriverVehicle');

const assignDriverVehicle = async (req, res) => {
  const { driverId, vehicleId } = req.body;
  try {
    const driverVehicle = new DriverVehicle({ driver: driverId, vehicle: vehicleId });
    await driverVehicle.save();
    res.status(201).json(driverVehicle);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const unassignDriverVehicle = async (req, res) => {
  const { driverId, vehicleId } = req.body;
  try {
    await DriverVehicle.findOneAndDelete({ driver: driverId, vehicle: vehicleId });
    res.status(200).json({ message: 'Unassigned successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getVehiclesByDriver = async (req, res) => {
  try {
    const vehicles = await DriverVehicle.find({ driver: req.params.driverId }).populate('vehicle');
    res.status(200).json(vehicles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDriversByVehicle = async (req, res) => {
  try {
    const drivers = await DriverVehicle.find({ vehicle: req.params.vehicleId }).populate('driver');
    res.status(200).json(drivers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  assignDriverVehicle,
  unassignDriverVehicle,
  getVehiclesByDriver,
  getDriversByVehicle
};