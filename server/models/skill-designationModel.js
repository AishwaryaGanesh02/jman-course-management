const prisma = require("../config/db");
const { addCourse } = require("../controllers/courseController");

const SkillDesignationModel = {
  getAllDesignations: async () => {
    return await prisma.designation.findMany();
  },

  getAllSkills: async () => {
    return await prisma.skill.findMany();
  },
};

module.exports = SkillDesignationModel;
