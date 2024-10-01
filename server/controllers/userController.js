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
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch users" });
  }
};

exports.addUserSkill = async (req, res) => {
  const { skillId, level } = req.body;
  const userId = req.userId;

  try {
    const newUserSkill = await UserModel.createUserSkill(
      userId,
      skillId,
      level
    );
    res.status(201).json({ message: "Skill added successfully", newUserSkill });
  } catch (error) {
    res.status(500).json({ error: "Failed to add skill" });
  }
};
