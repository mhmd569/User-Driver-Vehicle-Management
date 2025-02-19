const express = require("express");
const { check, body } = require("express-validator");
const multer = require("multer");
const {
  createVehicle,
  getAllVehicles,
  getVehicleById,
  updateVehicle,
  deleteVehicle,
  getVehiclesWithDrivers,
} = require("../controllers/vehicleController");
const authMiddleware = require("../middlewares/authMiddleware");

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
  upload.single("vehicleImage"),
  [
    check("name", "Name is required").not().isEmpty(),
    check("operationalID", "Operational ID is required").not().isEmpty(),
    check("serviceType", "Service Type is required").not().isEmpty(),
    check("make", "Make is required").not().isEmpty(),
    check("model", "Model is required").not().isEmpty(),
    check("makeYear", "Make Year is required").isInt(),
    check("category", "Category is required").not().isEmpty(),
    check("plateNumber", "Plate number is required").not().isEmpty(),
    check("color", "Color is required").not().isEmpty(),
    check("features", "Features are required").isArray({ min: 1 }),
    check("licenseExpiry", "License Expiry is required").isDate(),
    check(
      "daysUntilInspectionExpiry",
      "Days Until Inspection Expiry is required"
    ).isInt(),
    check("licenseStatus", "License Status is required").not().isEmpty(),
    check("numberOfSeats", "Number of Seats is required").isInt(),
    check("available", "Availability is required").isBoolean(),
    check("driver", "Driver is required").not().isEmpty(),
    body("vehicleImage").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Vehicle image is required");
      }
      return true;
    }),
  ],
  authMiddleware,
  createVehicle
);

router.get("/", authMiddleware, getAllVehicles);

router.get("/with-drivers", authMiddleware, getVehiclesWithDrivers);

router.get("/:id", authMiddleware, getVehicleById);

router.put(
  "/:id",
  upload.single("vehicleImage"),
  [
    check("name", "Name is required").optional().not().isEmpty(),
    check("operationalID", "Operational ID is required")
      .optional()
      .not()
      .isEmpty(),
    check("serviceType", "Service Type is required").optional().not().isEmpty(),
    check("make", "Make is required").optional().not().isEmpty(),
    check("model", "Model is required").optional().not().isEmpty(),
    check("makeYear", "Make Year is required").optional().isInt(),
    check("category", "Category is required").optional().not().isEmpty(),
    check("plateNumber", "Plate number is required").optional().not().isEmpty(),
    check("color", "Color is required").optional().not().isEmpty(),
    check("features", "Features are required").optional().isArray({ min: 1 }),
    check("licenseExpiry", "License Expiry is required").optional().isDate(),
    check(
      "daysUntilInspectionExpiry",
      "Days Until Inspection Expiry is required"
    )
      .optional()
      .isInt(),
    check("licenseStatus", "License Status is required")
      .optional()
      .not()
      .isEmpty(),
    check("numberOfSeats", "Number of Seats is required").optional().isInt(),
    check("available", "Availability is required").optional().isBoolean(),
    check("driver", "Driver is required").optional().not().isEmpty(),
    body("vehicleImage").custom((value, { req }) => {
      if (req.file && !req.file.mimetype.startsWith("image/")) {
        throw new Error("Invalid file type. Only images are allowed.");
      }
      return true;
    }),
  ],
  authMiddleware,
  updateVehicle
);

router.delete("/:id", authMiddleware, deleteVehicle);

module.exports = router;
