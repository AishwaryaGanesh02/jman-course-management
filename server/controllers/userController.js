const UserModel = require("../models/userModel");

// Get list of skills that a user has
exports.getUserSkills = async (req, res) => {
  try {
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

// Get list of all users with their designations
exports.getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.getAllUsers();
    const usersWithDesignations = users.map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      designation: user.designation ? user.designation.name : null,
    }));
    res.status(200).json(usersWithDesignations);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

// Add a skill to a user
exports.addUserSkill = async (req, res) => {
  const { skillId, level } = req.body;
  const userId = req.userId;
  try {
    const newUserSkill = await UserModel.createUserSkill(userId, skillId, level);
    res.status(201).json({ message: "Skill added successfully", newUserSkill });
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill" });
  }
};

// Create progress entry for an employee
exports.createEmployeeProgress = async (req, res) => {
  const {
    employeeId,
    courseId,
    progressStatus,
    modulesCompleted,
    certificateProof,
    action,
    skills,
  } = req.body;

  try {
    const progressEntry = await UserModel.createEmployeeProgress(
      employeeId,
      courseId,
      progressStatus,
      modulesCompleted,
      certificateProof
    );

    // Create user skills if progress is completed
    if (progressStatus === "completed" && skills && Array.isArray(skills)) {
      const skillPromises = skills.map((skill) =>
        UserModel.createUserSkill(employeeId, skill.skillId, skill.level)
      );
      await Promise.all(skillPromises);
    }

    res.status(201).json({ message: `Course ${action} successfully`, progressEntry });
  } catch (error) {
    res.status(500).json({ error: "Failed to create employee progress" });
  }
};

// Get progress of a user for a specific course
exports.getUserProgress = async (req, res) => {
  const courseId = parseInt(req.params.courseId, 10);
  const userId = req.userId;

  try {
    const userProgress = await UserModel.getUserProgress(userId, courseId);
    res.status(200).json(userProgress);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

// Get detailed user information
exports.getUserInfo = async (req, res) => {
  try {
    const userSkills = await UserModel.findUserById(req.userId);
    const response = {
      data: {
        name: userSkills.username,
        email: userSkills.email,
        gender: userSkills.gender,
        phoneNumber: userSkills.phoneNumber,
        designation: userSkills.designation.name,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch user info" });
  }
};

// Update user information
exports.editUserInfo = async (req, res) => {
  const { name, phoneNumber, gender } = req.body;
  const userId = req.userId;

  try {
    await UserModel.editUserInfo(userId, name, phoneNumber, gender);
    res.status(200).json({ message: "User info updated successfully." });
  } catch (error) {
    res.status(500).json({ error: "Failed to update user info." });
  }
};
