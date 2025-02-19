const { check } = require("express-validator");

const validatePassword = check("password")
  .isLength({ min: 6 })
  .withMessage("Password must be at least 6 characters long")
  .matches(/[A-Z]/)
  .withMessage("Password must contain at least one uppercase letter")
  .matches(/[0-9]/)
  .withMessage("Password must contain at least one number")
  .matches(/[!@#$%^&*]/)
  .withMessage(
    "Password must contain at least one special character (!@#$%^&*)"
  );

module.exports = validatePassword;
