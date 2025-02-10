const express = require("express");
const { check, body } = require("express-validator");
const multer = require("multer");
const {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getDriversWithVehicles,
} = require("../controllers/driverController");
const authMiddleware = require("../middlewares/authMiddleware");
const validatePassword = require("../utils/validation");

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
  "/",
  upload.single("profileImage"),
  [
    check("name", "Name is required").not().isEmpty(),
    check("username", "Username is required").not().isEmpty(),
    validatePassword,
    check("employeeId", "Employee ID is required").not().isEmpty(),
    check("birthday", "Birthday is required").isDate(),
    check("status", "Status is required").not().isEmpty(),
    check("licenseNumber", "License Number is required").not().isEmpty(),
    check("licenseStatus", "License Status is required").not().isEmpty(),
    check("licenseExpiry", "License Expiry is required").isDate(),
    check("nationality", "Nationality is required").not().isEmpty(),
    check("languages", "Languages are required").isArray({ min: 1 }),
    body("profileImage").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Profile image is required");
      }
      return true;
    }),
  ],
  authMiddleware,
  createDriver
);

router.get("/", authMiddleware, getAllDrivers);

router.get("/:id", authMiddleware, getDriverById);

router.put(
  "/:id",
  upload.single("profileImage"),
  [
    check("name", "Name is required").optional().not().isEmpty(),
    check("username", "Username is required").optional().not().isEmpty(),
    check("password", "Password must be at least 6 characters long")
      .optional()
      .isLength({ min: 6 }),
    check("employeeId", "Employee ID is required").optional().not().isEmpty(),
    check("birthday", "Birthday is required").optional().isDate(),
    check("status", "Status is required").optional().not().isEmpty(),
    check("licenseNumber", "License Number is required")
      .optional()
      .not()
      .isEmpty(),
    check("licenseStatus", "License Status is required")
      .optional()
      .not()
      .isEmpty(),
    check("licenseExpiry", "License Expiry is required").optional().isDate(),
    check("nationality", "Nationality is required").optional().not().isEmpty(),
    check("languages", "Languages are required").optional().isArray({ min: 1 }),
    body("profileImage").custom((value, { req }) => {
      if (req.file && !req.file.mimetype.startsWith("image/")) {
        throw new Error("Invalid file type. Only images are allowed.");
      }
      return true;
    }),
  ],
  authMiddleware,
  updateDriver
);

router.delete("/:id", authMiddleware, deleteDriver);

router.get("/with-vehicles", authMiddleware, getDriversWithVehicles);

module.exports = router;
