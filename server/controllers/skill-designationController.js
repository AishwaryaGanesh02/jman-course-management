const SkillDesignationModel = require("../models/skill-designationModel");

// Get all designations
exports.getDesignations = async (req, res) => {
  try {
    const designations = await SkillDesignationModel.getAllDesignations();
    res.json(designations);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get all skills
exports.getSkills = async (req, res) => {
  try {
    const skills = await SkillDesignationModel.getAllSkills();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};
