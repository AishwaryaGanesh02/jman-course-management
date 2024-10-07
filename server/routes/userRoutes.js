const express = require("express");
const authenticateToken = require("../middlewares/authMiddleware");
const {
  getUserSkills,
  getAllUsers,
  getOtherSkills,
  addUserSkill,
  createEmployeeProgress,
  getUserProgress,
  getUserInfo,
  editUserInfo,
} = require("../controllers/userController");

const router = express.Router();

/**
 * GET /skills
 * Retrieves the skills associated with the authenticated user.
 * Used in: SkillSet.jsx
 */
router.get("/skills", authenticateToken, getUserSkills);

/**
 * GET /other-skills
 * Retrieves additional skills available for the authenticated user.
 * Used in: AddUserSkillModel.jsx
 */
router.get("/other-skills", authenticateToken, getOtherSkills);

/**
 * POST /add-skills
 * Adds skills to the authenticated user's profile.
 * Used in: SkillSet.jsx
 */
router.post("/add-skills", authenticateToken, addUserSkill);

/**
 * GET /
 * Retrieves a list of all users.
 * Used in: AssignCourseModel.jsx
 */
router.get("/", authenticateToken, getAllUsers);

/**
 * GET /userInfo
 * Retrieves the information of the authenticated user.
 * Used in: Profile.jsx
 */
router.get("/userInfo", authenticateToken, getUserInfo);

/**
 * PUT /edit/userInfo
 * Edits the information of the authenticated user.
 * Used in: Profile.jsx
 */
router.put("/edit/userInfo", authenticateToken, editUserInfo);

/**
 * POST /add-employee-progress
 * Creates progress records for the authenticated user's courses.
 * Used in: EmployeeCourseList.jsx
 */
router.post(
  "/add-employee-progress",
  authenticateToken,
  createEmployeeProgress
);

/**
 * GET /employee-progress/:courseId
 * Retrieves progress for a specific course for the authenticated user.
 * Used in: CourseDetail.jsx
 */
router.get("/employee-progress/:courseId", authenticateToken, getUserProgress);

module.exports = router;
