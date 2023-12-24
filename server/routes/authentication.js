const express = require("express");

const {
  signupUser,
  loginUser,
  logoutUser,
  getUser,
} = require("../controllers/authController");

const router = express.Router();

router.post("/signup", signupUser);

router.post("/auth", loginUser);

router.post("/logout", logoutUser);

router.get("/:email", getUser);

module.exports = router;
