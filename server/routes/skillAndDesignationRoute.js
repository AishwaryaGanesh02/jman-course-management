const express = require("express");
const {
  getDesignations,
  getSkills,
} = require("../controllers/skill-designationController");

const router = express.Router();

/**
 * GET /designations
 * Retrieves the list of designations available.
 * Used in: Signup.jsx
 */
router.get("/designations", getDesignations);

/**
 * GET /skills
 * Retrieves the list of skills available.
 * Used in: AllCourses.jsx
 */
router.get("/skills", getSkills);

module.exports = router;
