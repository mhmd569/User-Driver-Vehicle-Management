const express = require("express");
const { check } = require("express-validator");
const { signup, login } = require("../controllers/authController");
const router = express.Router();

router.post(
  "/signup",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
  ],
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