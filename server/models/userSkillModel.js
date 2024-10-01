const prisma = require("../config/db");

const UserSkillModel = {
  getUserSkills: async (userId) => {
    return await prisma.userSkill.findMany({
      where: { userId: Number(userId) },
      include: { skill: true },
    });
  },

  saveUserSkill: async (userId, skillId, level) => {
    return await prisma.userSkill.upsert({
      where: {
        userId_skillId: { userId: Number(userId), skillId: Number(skillId) },
      },
      update: { level },
      create: { userId: Number(userId), skillId: Number(skillId), level },
    });
  },

  // Create a new user skill
  createUserSkill: async (userId, skillId) => {
    return await prisma.userSkill.create({
      data: {
        userId: Number(userId),
        skillId: Number(skillId),
      },
    });
  },
};

module.exports = UserSkillModel;
