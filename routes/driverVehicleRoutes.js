const express = require('express');
const router = express.Router();
const driverVehicleController = require('../controllers/driverVehicleController');

router.post('/assign', driverVehicleController.assignDriverVehicle);

router.post('/unassign', driverVehicleController.unassignDriverVehicle);

router.get('/driver/:driverId', driverVehicleController.getVehiclesByDriver);

router.get('/vehicle/:vehicleId', driverVehicleController.getDriversByVehicle);

module.exports = router;