const prisma = require("../config/db");

const CourseModel = {
  getCourseSkills: async (courseId) => {
    return await prisma.courseSkill.findMany({
      where: { courseId },
      include: { skill: true },
    });
  },

  getAvailableCourses: async (userId) => {
    const enrolledCourses = await prisma.employeeProgress.findMany({
      where: { userId },
      select: { courseId: true },
    });

    const enrolledCourseIds = enrolledCourses.map(
      (progress) => progress.courseId
    );

    return await prisma.course.findMany({
      where: { NOT: { id: { in: enrolledCourseIds } } },
    });
  },

  getUserCoursesWithProgress: async () => {
    const allProgressEntries = await prisma.employeeProgress.findMany({
      include: {
        course: true,
        user: {
          select: {
            id: true,
            username: true,
            designation: true,
          },
        },
      },
      where: {
        user: {
          NOT: {
            designation: null,
          },
        },
      },
    });

    const latestEntries = {};
    allProgressEntries.forEach((entry) => {
      const key = `${entry.userId}-${entry.courseId}`;
      if (
        !latestEntries[key] ||
        new Date(entry.lastUpdated) > new Date(latestEntries[key].lastUpdated)
      ) {
        latestEntries[key] = entry;
      }
    });

    return Object.values(latestEntries).map((entry) => ({
      ...entry,
      user: {
        id: entry.user.id,
        username: entry.user.username,
        designation: entry.user.designation?.name,
      },
      course: entry.course,
    }));
  },

  getCourseDetailsWithProgress: async (courseId) => {
    courseId = Number(courseId);

    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    const skills = await prisma.courseSkill.findMany({
      where: { courseId },
      include: { skill: true },
    });

    const progressEntries = await prisma.employeeProgress.findMany({
      where: { courseId },
      include: {
        user: {
          include: {
            designation: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    const statusCounts = {
      not_started: 0,
      in_progress: 0,
      completed: 0,
    };

    const designationProgressCounts = {};

    progressEntries.forEach(({ user, progressStatus }) => {
      if (progressStatus in statusCounts) {
        statusCounts[progressStatus] += 1;
      }

      const designationName = user?.designation?.name;
      if (designationName) {
        if (!designationProgressCounts[designationName]) {
          designationProgressCounts[designationName] = {
            not_started: 0,
            in_progress: 0,
            completed: 0,
          };
        }
        designationProgressCounts[designationName][progressStatus] += 1;
      }
    });

    return {
      course,
      skills,
      progressCounts: statusCounts,
      designationProgressCounts,
    };
  },

  getAllCourses: async (role, userId) => {
    if (role === "employee") {
      return await prisma.course.findMany({
        where: {
          EmployeeProgress: {
            some: {
              userId: userId,
            },
          },
        },
        include: {
          courseSkills: {
            include: {
              skill: true,
            },
          },
          EmployeeProgress: {
            where: {
              userId: userId,
            },
          },
        },
      });
    } else {
      return await prisma.course.findMany({
        include: {
          courseSkills: {
            include: {
              skill: true,
            },
          },
        },
      });
    }
  },

  getCourseIdsByUserId: async (userId) => {
    try {
      const courses = await prisma.course.findMany({
        where: {
          EmployeeProgress: {
            some: {
              userId: userId,
            },
          },
        },
        select: {
          id: true,
        },
      });

      return courses.map((course) => course.id);
    } catch (error) {
      throw new Error("Error fetching course IDs: " + error.message);
    }
  },

  getAllCourseIds: async () => {
    try {
      const courses = await prisma.course.findMany({
        select: {
          id: true,
        },
      });

      return courses.map((course) => course.id);
    } catch (error) {
      throw new Error("Error fetching all course IDs: " + error.message);
    }
  },
};

module.exports = CourseModel;
