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

// Get list of users
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
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.addUserSkill = async (req, res) => {
  const { skillId, level } = req.body;
  const userId = req.userId;

  // console.log("0890", userId,
  //   skillId,
  //   level)
  try {
    const newUserSkill = await UserModel.createUserSkill(
      userId,
      skillId,
      level
    );
    console.log("0890");
    res.status(201).json({ message: "Skill added successfully", newUserSkill });
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill" });
  }
};

// Create employee progress
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
    // Create the progress entry
    const progressEntry = await UserModel.createEmployeeProgress(
      employeeId,
      courseId,
      progressStatus,
      modulesCompleted,
      certificateProof
    );

    // Only create user skills if progressStatus is 'completed'
    if (progressStatus === "completed" && skills && Array.isArray(skills)) {
      const skillPromises = skills.map((skill) =>
        UserModel.createUserSkill(employeeId, skill.skillId, skill.level)
      );

      await Promise.all(skillPromises);
    }

    res
      .status(201)
      .json({ message: `Course ${action} successfully`, progressEntry });
  } catch (error) {
    console.error("Error creating employee progress:", error);
    res.status(500).json({ error: "Failed to create employee progress" });
  }
};

exports.getUserProgress = async (req, res) => {
  const courseId = parseInt(req.params.courseId, 10);
  const userId = req.userId;

  try {
    const userProgress = await UserModel.getUserProgress(userId, courseId);

    res.status(201).json(userProgress);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const userSkills = await UserModel.findUserById(req.userId);
    console.log(userSkills);
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
    res.status(500).json({ error: "Failed to fetch user skills" });
  }
};

exports.editUserInfo = async (req, res) => {
  const { name, phoneNumber, gender } = req.body;
  const userId = req.userId;

  try {
    const a = await UserModel.editUserInfo(userId, name, phoneNumber, gender);
    console.log(a);
    res.status(200).json({ message: "User info updated successfully." });
  } catch (error) {
    console.error("Failed to update user info:", error);
    res.status(500).json({ error: "Failed to update user info." });
  }
};
