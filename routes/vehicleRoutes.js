const express = require("express");
const { check } = require("express-validator");
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

router.post(
  "/",
  [
    check("operationalID", "Operational ID is required").not().isEmpty(),
    check("plateNumber", "Plate number is required").not().isEmpty(),
  ],
  authMiddleware,
  createVehicle
);

router.get("/", authMiddleware, getAllVehicles);

router.get("/:id", authMiddleware, getVehicleById);

router.put(
  "/:id",
  [
    check("operationalID", "Operational ID is required").optional().not().isEmpty(),
    check("plateNumber", "Plate number is required").optional().not().isEmpty(),
  ],
  authMiddleware,
  updateVehicle
);

router.delete("/:id", authMiddleware, deleteVehicle);

router.get("/with-drivers", authMiddleware, getVehiclesWithDrivers);

module.exports = router;