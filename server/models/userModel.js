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
    console.log("--");
    const userId = Number(employeeId);
    const skillIdNum = Number(skillId);
    const levelOrder = {
      Beginner: 1,
      Intermediate: 2,
      Advanced: 3,
    };
    console.log(userId, skillIdNum, level);
    // Check if the user skill already exists
    const existingUserSkill = await prisma.userSkill.findFirst({
      where: {
        AND: [{ userId: userId }, { skillId: skillIdNum }],
      },
    });
    console.log(existingUserSkill, "--------");
    // } catch (error) {
    //   console.error("Error fetching user skill:", error);
    // }
    // If it exists, compare levels
    if (existingUserSkill) {
      const existingLevel = existingUserSkill.level;

      // Compare the levels
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
};

module.exports = UserModel;
