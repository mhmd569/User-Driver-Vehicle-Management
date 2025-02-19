const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  phoneNumber: { type: String, unique: true },
  role: String,
  address: String,
  profileImage: String,
  status: String,
  lastLogin: Date,
  password: { type: String, required: true },
});

module.exports = mongoose.model("User", userSchema);
