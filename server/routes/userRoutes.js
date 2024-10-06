const express = require("express");
const {
  getCourseSkills,
  getAvailableCourses,
  getUserCoursesWithProgress,
  getCourseDetails,
  getAllCourses,
  getCourseId,
} = require("../controllers/courseController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();

/**
 * GET /:courseId/skills
 * Retrieves the skills associated with a specific course.
 * Used in: CourseDetail.jsx
 */
router.get("/:courseId/skills", getCourseSkills);

/**
 * GET /available/:id
 * Retrieves available courses for the user.
 * Used in: AssignCourseModel.jsx
 */
router.get("/available/:id", authenticateToken, getAvailableCourses);

/**
 * GET /user/progress
 * Retrieves the courses that the user is enrolled in, along with their progress.
 * Used in: EmployeeCourseList.jsx
 */
router.get("/user/progress", authenticateToken, getUserCoursesWithProgress);

/**
 * GET /:courseId/details
 * Retrieves detailed information about a specific course.
 * Used in: CourseDetail.jsx
 */
router.get("/:courseId/details", authenticateToken, getCourseDetails);

/**
 * GET /
 * Retrieves a list of all available courses.
 * Used in: AllCourses.jsx
 */
router.get("/", authenticateToken, getAllCourses);

/**
 * GET /valid-ids
 * Retrieves valid course IDs for the user.
 * Used in: ProtectRoutes.jsx
 */
router.get("/valid-ids", authenticateToken, getCourseId);

module.exports = router;
