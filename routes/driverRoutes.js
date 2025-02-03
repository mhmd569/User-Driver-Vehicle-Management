const express = require("express");
const { check } = require("express-validator");
const {
  createDriver,
  getAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriver,
  getDriversWithVehicles,
} = require("../controllers/driverController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/",
  [
    check("username", "Username is required").not().isEmpty(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
    check("employeeId", "Employee ID is required").not().isEmpty(),
  ],
  authMiddleware,
  createDriver
);

router.get("/", authMiddleware, getAllDrivers);

router.get("/:id", authMiddleware, getDriverById);

router.put(
  "/:id",
  [
    check("username", "Username is required").optional().not().isEmpty(),
    check("password", "Password must be at least 6 characters long").optional().isLength({ min: 6 }),
    check("employeeId", "Employee ID is required").optional().not().isEmpty(),
  ],
  authMiddleware,
  updateDriver
);

router.delete("/:id", authMiddleware, deleteDriver);

router.get("/with-vehicles", authMiddleware, getDriversWithVehicles);

module.exports = router;