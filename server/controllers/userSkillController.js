const UserSkillModel = require("../models/userSkillModel");

const userSkillsController = {
  getUserSkills: async (req, res) => {
    const { userId } = req.params;
    try {
      const userSkills = await UserSkillModel.getUserSkills(userId);
      res.json(userSkills);
    } catch (error) {
      res.status(500).json({ error: "Error fetching user skills" });
    }
  },

  saveUserSkill: async (req, res) => {
    const { userId, skillId, level } = req.body;
    try {
      const userSkill = await UserSkillModel.saveUserSkill(
        userId,
        skillId,
        level
      );
      res.json(userSkill);
    } catch (error) {
      res.status(500).json({ error: "Error saving user skill" });
    }
  },
};

module.exports = userSkillsController;
