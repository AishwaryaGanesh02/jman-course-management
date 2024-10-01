const prisma = require("../config/db");

const CourseModel = {
  getCourseSkills: async (courseId) => {
    return await prisma.courseSkill.findMany({
      where: { courseId },
      include: { skill: true },
    });
  },

  getCourseDesignations: async (courseId) => {
    return await prisma.designationSkill.findMany({
      where: { courseId },
      include: { designation: true },
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
    return await prisma.employeeProgress.findMany({
      include: {
        course: true,
        user: true,
      },
    });
  },
};

module.exports = CourseModel;
