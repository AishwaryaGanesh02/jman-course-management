const prisma = require("../config/db");

const UserModel = {
  createUser: async (data) => {
    return await prisma.user.create({ data });
  },

  findUserById: async (id) => {
    return await prisma.user.findUnique({ where: { id } });
  },

  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  getAllUsers: async () => {
    return await prisma.user.findMany();
  },

  getUserSkills: async (userId) => {
    return await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });
  },

  getOtherSkills: async (userId) => {
    const userSkills = await prisma.userSkill.findMany({
      where: { userId },
      include: { skill: true },
    });
    const userSkillIds = userSkills.map((userSkill) => userSkill.skillId);

    return await prisma.skill.findMany({
      where: {
        NOT: {
          id: {
            in: userSkillIds,
          },
        },
      },
    });
  },
  // Create a new user skill
  createUserSkill: async (userId, skillId, level) => {
    return await prisma.userSkill.create({
      data: {
        userId: Number(userId),
        skillId: Number(skillId),
        level,
      },
    });
  },
};

module.exports = UserModel;
