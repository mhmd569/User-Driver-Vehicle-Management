const express = require("express");
const { check } = require("express-validator");
const { signup, login } = require("../controllers/authController");
const validatePassword = require("../utils/validation");
const router = express.Router();

router.post(
  "/signup",
  [check("email", "Please include a valid email").isEmail(), validatePassword],
  signup
);

router.post(
  "/login",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),
  ],
  login
);

module.exports = router;
