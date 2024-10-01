const DesignationModel = require("../models/designationModel");

const getDesignations = async (req, res, next) => {
  try {
    const designations = await DesignationModel.getAllDesignations();
    res.json(designations);
  } catch (error) {
    next(error);
  }
};

const getSkills = async (req, res, next) => {
  try {
    const skills = await DesignationModel.getAllSkills();
    res.json(skills);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDesignations,
  getSkills,
};
