const mongoose = require("mongoose");

const LicenseStatusEnum = ["valid", "expired"];

const vehicleSchema = new mongoose.Schema({
  name: String,
  operationalID: { type: String, unique: true },
  serviceType: String,
  make: String,
  model: String,
  makeYear: Number,
  category: String,
  plateNumber: { type: String, unique: true },
  color: String,
  features: [String],
  licenseExpiry: Date,
  daysUntilInspectionExpiry: Number,
  licenseStatus: {
    type: String,
    enum: LicenseStatusEnum,
  },
  numberOfSeats: Number,
  available: Boolean,
  vehicleImage: String, // URL to the vehicle image
  driver: { type: mongoose.Schema.Types.ObjectId, ref: "Driver", unique: true }, // One-to-One with Driver
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
