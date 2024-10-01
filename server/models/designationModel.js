const prisma = require("../config/db");

const DesignationModel = {
  getAllDesignations: async () => {
    return await prisma.designation.findMany();
  },
  getAllSkills: async () => {
    return await prisma.skill.findMany();
  },
};

module.exports = DesignationModel;
