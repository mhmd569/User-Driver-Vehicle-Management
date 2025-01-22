const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", vehicleController.createVehicle); // Create
router.get("/", authMiddleware, vehicleController.getVehicles); // Read all
router.get("/:id", authMiddleware, vehicleController.getVehicleById); // Read one
router.put("/:id", authMiddleware, vehicleController.updateVehicle); // Update
router.delete("/:id", authMiddleware, vehicleController.deleteVehicle); // Delete

module.exports = router;