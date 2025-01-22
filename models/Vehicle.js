const mongoose = require('mongoose');

const vehicleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  operationalID: { type: String, unique: true, required: true },
  serviceType: String,
  make: String,
  model: String,
  makeYear: Number,
  category: String,
  plateNumber: { type: String, unique: true, required: true },
  color: String,
  features: [String],
  licenseExpiry: Date,
  daysUntilInspectionExpiry: Number,
  licenseStatus: { type: String, enum: ['valid', 'expired'], required: true },
  numberOfSeats: Number,
  available: { type: Boolean, default: true },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'Driver' }
}, { timestamps: true });

module.exports = mongoose.model('Vehicle', vehicleSchema);
