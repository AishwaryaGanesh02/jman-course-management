const express = require("express");
const {
  getCourseSkills,
  getCourseDesignations,
  getAvailableCourses,
  getUserCoursesWithProgress,
  getCourseDetails,
  getAllCourses
} = require("../controllers/courseController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/:courseId/skills", getCourseSkills);
router.get("/:courseId/designations", getCourseDesignations);
router.get("/available/:id", authenticateToken, getAvailableCourses);
router.get("/user/progress", authenticateToken, getUserCoursesWithProgress);
router.get("/:courseId/details", authenticateToken, getCourseDetails);
router.get("/", authenticateToken, getAllCourses);

module.exports = router;
