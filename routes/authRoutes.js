const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/", (req, res) => {
  res.send("Welcome to the Auth API");
}); // test route
module.exports = router;
