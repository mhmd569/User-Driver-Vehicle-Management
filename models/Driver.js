const mongoose = require("mongoose");

const driverSchema = new mongoose.Schema({
  name: String,
  username: { type: String, unique: true },
  password: { type: String, required: true },
  employeeId: { type: String, unique: true },
  profileImage: String,
  birthday: Date,
  status: String,
  licenseNumber: String,
  licenseImage: String,
  licenseStatus: String,
  licenseExpiry: Date,
  nationality: String,
  languages: [String],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vehicle",
    unique: true,
  }, // One-to-One with Vehicle
});

module.exports = mongoose.model("Driver", driverSchema);
