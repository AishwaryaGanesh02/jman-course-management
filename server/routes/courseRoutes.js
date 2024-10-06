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

router.get("/:courseId/skills", getCourseSkills); //courseDetail.jsx
router.get("/available/:id", authenticateToken, getAvailableCourses); //assigncoursemodel.jsx
router.get("/user/progress", authenticateToken, getUserCoursesWithProgress); //employeeCourseList.jsx
router.get("/:courseId/details", authenticateToken, getCourseDetails); //courseDetail.jsx
router.get("/", authenticateToken, getAllCourses);  //Allcoursse.jsx
router.get("/valid-ids", authenticateToken, getCourseId); //protectRoutes.jsx

module.exports = router;
