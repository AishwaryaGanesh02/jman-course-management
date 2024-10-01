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

  getCourseDetailsWithProgress: async (courseId) => {
    courseId = Number(courseId);
    // Fetch course details
    const course = await prisma.course.findUnique({
      where: { id: courseId },
    });

    // Fetch skills associated with the course
    const skills = await prisma.courseSkill.findMany({
      where: { courseId },
      include: { skill: true },
    });

    // Count the number of completed progress entries for this course
    const completedCount = await prisma.employeeProgress.count({
      where: {
        courseId,
        progressStatus: "completed",
      },
    });

    // Fetch all progress entries for this course to count unique userId
    const progressEntries = await prisma.employeeProgress.findMany({
      where: { courseId },
      select: { userId: true },
    });
    // Calculate the number of unique userId values
    const enrolledCount = new Set(progressEntries.map((entry) => entry.userId))
      .size;

    return {
      course,
      skills: skills.map((courseSkill) => courseSkill.skill),
      completedCount: completedCount,
      enrolledCount: enrolledCount,
    };
  },
};
module.exports = CourseModel;
