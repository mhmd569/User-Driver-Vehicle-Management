const { validationResult } = require("express-validator");
const User = require("../models/User");
const bcrypt = require("bcryptjs");

exports.createUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { email, password, ...rest } = req.body;
    // Check if email or phone number already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { phoneNumber: rest.phoneNumber }],
    });

    if (existingUser) {
      const conflictField =
        existingUser.email === email ? "email" : "phone number";
      return res
        .status(400)
        .json({ message: `${conflictField} already exists` });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      ...rest,
      email: email,
      password: hashedPassword,
      profileImage: req.file.path,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { password, ...rest } = req.body;
    if (password) {
      rest.password = await bcrypt.hash(password, 10);
    }
    if (req.file) {
      rest.profileImage = req.file.path;
    }

    const isEmailOrPhoneNumberExists = await User.findOne({
      $or: [{ email: rest.email }, { phoneNumber: rest.phoneNumber }],
    });
    if (isEmailOrPhoneNumberExists) {
      const conflictField =
        isEmailOrPhoneNumberExists.email === rest.email
          ? "email"
          : "phone number";
      return res
        .status(400)
        .json({ message: `${conflictField} already exists` });
    }

    const user = await User.findByIdAndUpdate(req.params.id, rest, {
      new: true,
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
