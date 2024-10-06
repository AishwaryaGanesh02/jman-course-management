const prisma = require("../config/db");

const SkillDesignationModel = {

  getAllDesignations: async () => {
    return await prisma.designation.findMany();
  },

  getAllSkills: async () => {
    return await prisma.skill.findMany();
  },

};

module.exports = SkillDesignationModel;
