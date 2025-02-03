const express = require("express");
const { check } = require("express-validator");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

router.post(
  "/",
  [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password must be at least 6 characters long").isLength({ min: 6 }),
    check("phoneNumber", "Please include a valid phone number").isMobilePhone(),
  ],
  authMiddleware,
  createUser
);

router.get("/", authMiddleware, getAllUsers);

router.get("/:id", authMiddleware, getUserById);

router.put(
  "/:id",
  [
    check("email", "Please include a valid email").optional().isEmail(),
    check("password", "Password must be at least 6 characters long").optional().isLength({ min: 6 }),
    check("phoneNumber", "Please include a valid phone number").optional().isMobilePhone(),
  ],
  authMiddleware,
  updateUser
);

router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;