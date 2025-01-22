const mongoose = require('mongoose');

const driverSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  employeeId: { type: String, unique: true, required: true },
  profileImage: String,
  birthday: Date,
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  licenseNumber: { type: String, unique: true, required: true },
  licenseImage: String,
  licenseStatus: { type: String, enum: ['valid', 'expired'], required: true },
  licenseExpiry: Date,
  nationality: String,
  languages: [String]
}, { timestamps: true });

module.exports = mongoose.model('Driver', driverSchema);
