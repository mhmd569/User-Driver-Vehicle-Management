const mongoose = require('mongoose');

const driverVehicleSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver', required: true },
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true }
});

module.exports = mongoose.model('DriverVehicle', driverVehicleSchema);