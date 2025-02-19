const express = require("express");
const {
  getAvailableDrivers,
  getVehiclesWithExpiredLicense,
  getDriversWithExpiredLicense,
  getDriversWithVehicleExpiredLicense,
} = require("../controllers/availabilityController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.get("/available-drivers", authMiddleware, getAvailableDrivers);
router.get("/expired-vehicles", authMiddleware, getVehiclesWithExpiredLicense);
router.get("/expired-drivers", authMiddleware, getDriversWithExpiredLicense);
router.get("/drivers-with-expired-vehicles", authMiddleware, getDriversWithVehicleExpiredLicense);

module.exports = router;