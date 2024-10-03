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
} = require("../controllers/userController");

const router = express.Router();
router.get("/skills", authenticateToken, getUserSkills);
router.get("/other-skills", authenticateToken, getOtherSkills);
router.post("/add-skills", authenticateToken, addUserSkill);
router.get("/", authenticateToken, getAllUsers);
router.get("/userInfo", authenticateToken, getUserInfo);
router.post(
  "/add-employee-progress",
  authenticateToken,
  createEmployeeProgress
);
router.get("/employee-progress/:courseId", authenticateToken, getUserProgress);

module.exports = router;
