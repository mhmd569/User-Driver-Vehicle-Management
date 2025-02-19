const express = require("express");
const { check, body } = require("express-validator");
const multer = require("multer");
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");
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
    check("firstName", "First name is required").not().isEmpty(),
    check("lastName", "Last name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check("phoneNumber", "Please include a valid phone number").isMobilePhone(),
    check("role", "Role is required").not().isEmpty(),
    check("address", "Address is required").not().isEmpty(),
    check("status", "Status is required").not().isEmpty(),
    validatePassword,
    body("profileImage").custom((value, { req }) => {
      if (!req.file) {
        throw new Error("Profile image is required");
      }
      return true;
    }),
  ],
  authMiddleware,
  createUser
);

router.get("/", authMiddleware, getAllUsers);

router.get("/:id", authMiddleware, getUserById);

router.put(
  "/:id",
  upload.single("profileImage"),
  [
    check("firstName", "First name is required").optional().not().isEmpty(),
    check("lastName", "Last name is required").optional().not().isEmpty(),
    check("email", "Please include a valid email").optional().isEmail(),
    check("phoneNumber", "Please include a valid phone number")
      .optional()
      .isMobilePhone(),
    check("role", "Role is required").optional().not().isEmpty(),
    check("address", "Address is required").optional().not().isEmpty(),
    check("status", "Status is required").optional().not().isEmpty(),
    validatePassword,
    body("profileImage").custom((value, { req }) => {
      if (req.file && !req.file.mimetype.startsWith("image/")) {
        throw new Error("Invalid file type. Only images are allowed.");
      }
      return true;
    }),
  ],
  authMiddleware,
  updateUser
);

router.delete("/:id", authMiddleware, deleteUser);

module.exports = router;
