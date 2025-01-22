const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", driverController.createDriver); // Create
router.get("/", authMiddleware, driverController.getDrivers); // Read all
router.get("/:id", authMiddleware, driverController.getDriverById); // Read one
router.put("/:id", authMiddleware, driverController.updateDriver); // Update
router.delete("/:id", authMiddleware, driverController.deleteDriver); // Delete

module.exports = router;