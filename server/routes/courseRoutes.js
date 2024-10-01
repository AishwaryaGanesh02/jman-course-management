const express = require("express");
const {
  getCourseSkills,
  getCourseDesignations,
  getAvailableCourses,
  getUserCoursesWithProgress,
} = require("../controllers/courseController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:courseId/skills", getCourseSkills);
router.get("/:courseId/designations", getCourseDesignations);
router.get("/available", authenticateToken, getAvailableCourses);
router.get("/user/progress", authenticateToken, getUserCoursesWithProgress);

module.exports = router;
