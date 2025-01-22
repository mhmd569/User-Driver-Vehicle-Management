const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/", userController.createUser); // Create
router.get("/", authMiddleware, userController.getUsers); // Read all
router.get("/:id", authMiddleware, userController.getUserById); // Read one
router.put("/:id", authMiddleware, userController.updateUser); // Update
router.delete("/:id", authMiddleware, userController.deleteUser); // Delete

module.exports = router;