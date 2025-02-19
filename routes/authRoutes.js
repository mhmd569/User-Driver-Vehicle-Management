const express = require("express");
const { check, body } = require("express-validator");
const { signup, login } = require("../controllers/authController");
const validatePassword = require("../utils/validation");
const multer = require("multer");
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

router.post(
  "/signup",
  upload.single("profileImage"),
  [
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phoneNumber", "Please include a valid phone number").isMobilePhone(),
    check("role", "Role is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    validatePassword,
    body("profileImage").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Profile image is required");
      }
      return true;
    }),
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
