const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    phoneNumber: { type: String, unique: true, required: true },
    role: {
      type: String,
      enum: ["admin", "driver", "manager"],
      required: true,
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    profileImage: String,
    status: {
      type: String,
      enum: ["active", "suspended", "deleted"],
      default: "active",
    },
    preferences: {
      notifications: Boolean,
      theme: String,
    },
    lastLogin: { type: Date, default: Date.now },
    password: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
