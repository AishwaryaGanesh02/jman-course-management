const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router();

/**
 * POST /register
 * Registers a new user.
 * Used in: Signup.jsx
 */
router.post("/register", authController.register);

/**
 * POST /login
 * Authenticates a user and logs them in.
 * Used in: Login.jsx
 */
router.post("/login", authController.login);

module.exports = router;
