const prisma = require("../config/db");

const UserModel = {

  createUser: async (data) => {
    return await prisma.user.create({ data });
  },

  findUserById: async (id) => {
    const userId = Number(id);
    return await prisma.user.findUnique({
      where: { id: userId },
      include: {
        designation: {
          select: {
            name: true,
          },
        },
      },
    });
  },

  findUserByEmail: async (email) => {
    return await prisma.user.findUnique({ where: { email } });
  },

  getAllUsers: async () => {
    return await prisma.user.findMany({
      include: {
        designation: {
          select: {
            name: true,
          },
        },
      },
    });
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

  createUserSkill: async (employeeId, skillId, level) => {
    const userId = Number(employeeId);
    const skillIdNum = Number(skillId);
    const levelOrder = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
    };

    const existingUserSkill = await prisma.userSkill.findFirst({
      where: {
        AND: [{ userId: userId }, { skillId: skillIdNum }],
      },
    });

    if (existingUserSkill) {
      const existingLevel = existingUserSkill.level;

      if (levelOrder[level] > levelOrder[existingLevel]) {
        return await prisma.userSkill.update({
          where: {
            id: existingUserSkill.id,
          },
          data: {
            level,
          },
        });
      }
    } else {
      return await prisma.userSkill.create({
        data: {
          userId,
          skillId: skillIdNum,
          level,
        },
      });
    }
  },

  createEmployeeProgress: async (
    userId,
    courseId,
    progressStatus,
    modulesCompleted,
    certificateProof
  ) => {
    return await prisma.employeeProgress.create({
      data: {
        userId: Number(userId),
        courseId: Number(courseId),
        progressStatus,
        modulesCompleted,
        certificateProof,
        lastUpdated: new Date(),
      },
    });
  },

  getUserProgress: async (userId, courseId) => {
    return await prisma.employeeProgress.findMany({
      where: {
        courseId: Number(courseId),
        userId: Number(userId),
      },
    });
  },

  editUserInfo: async (userId, name, phoneNumber, gender) => {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        username: name,
        phoneNumber,
        gender,
      },
    });
  },
};

module.exports = UserModel;
