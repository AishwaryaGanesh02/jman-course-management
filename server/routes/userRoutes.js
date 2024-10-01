const express = require("express");
const {
  getUserSkills,
  getAllUsers,
  getOtherSkills,
  addUserSkill,
} = require("../controllers/userController");
const authenticateToken = require("../middlewares/authMiddleware");

const router = express.Router();
router.get("/skills", authenticateToken, getUserSkills);
router.get("/other-skills", authenticateToken, getOtherSkills);
router.post("/add-skills", authenticateToken, addUserSkill);
router.get("/", authenticateToken, getAllUsers);

module.exports = router;
