const UserModel = require("../models/userModel");

// Get list of skills that a user has
exports.getUserSkills = async (req, res) => {
  try {
    console.log(req)
    const userSkills = await UserModel.getUserSkills(req.userId);
    const skillsWithLevels = userSkills.map((userSkill) => ({
      skill: userSkill.skill.name,
      level: userSkill.level,
    }));
    res.status(200).json(skillsWithLevels);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user skills" });
  }
};

// Get list of skills that a user could have
exports.getOtherSkills = async (req, res) => {
  try {
    const otherSkills = await UserModel.getOtherSkills(req.userId);

    res.status(200).json(otherSkills);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user skills" });
  }
};

// Get list of users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    const usersWithDesignations = users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      designation: user.designation ? user.designation.name : null,
    }));

    res.status(200).json(usersWithDesignations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.addUserSkill = async (req, res) => {
  const { skillId, level } = req.body;
  const userId = req.userId;

  console.log("0890", userId,
    skillId,
    level)
  try {
    const newUserSkill = await UserModel.createUserSkill(
      userId,
      skillId,
      level
    );
    console.log("0890")
    res.status(201).json({ message: "Skill added successfully", newUserSkill });
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill" });
  }
};

// Create employee progress
exports.createEmployeeProgress = async (req, res) => {
  const { employeeId, courseId } = req.body;
  console.log("00000", req.body)
  try {
    const progressEntry = await UserModel.createEmployeeProgress(employeeId, courseId);
    console.log("00000")
    res.status(201).json({ message: "Course assigned successfully", progressEntry });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create employee progress" });
  }
};

exports.getUserProgress = async (req, res) => {
  const courseId = parseInt(req.params.courseId, 10);
  const userId = req.userId;

  try {
    const userProgress = await UserModel.getUserProgress(
      userId,
      courseId
    );
    console.log(userProgress)
    res.status(201).json(userProgress);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};