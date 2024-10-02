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
    const allProgressEntries = await prisma.employeeProgress.findMany({
      include: {
        course: true,
        user: true,
      },
    });

    // Create a map to store the latest entry for each user-course combination
    const latestEntries = {};
    console.log(allProgressEntries)
    allProgressEntries.forEach(entry => {
      const key = `${entry.userId}-${entry.courseId}`;
      if (!latestEntries[key] || new Date(entry.lastUpdated) > new Date(latestEntries[key].lastUpdated)) {
        latestEntries[key] = entry;
      }
    });

    return Object.values(latestEntries);
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

    // Count progress statuses using groupBy
    const progressCounts = await prisma.employeeProgress.groupBy({
      by: ['progressStatus'],
      where: { courseId },
      _count: {
        userId: true,
      },
    });

    // Transform progressCounts to a more usable object
    const statusCounts = {
      not_started: 0,
      in_progress: 0,
      completed: 0,
    };

    progressCounts.forEach(entry => {
      if (entry.progressStatus in statusCounts) {
        statusCounts[entry.progressStatus] = entry._count.userId;
      }
    });

    return {
      course,
      skills: skills.map((courseSkill) => courseSkill.skill),
      progressCounts: statusCounts, // Include status counts in the return object
    }
  },

  getAllCourses: async () => {
    return await prisma.course.findMany({
      include: {
        courseSkills: {
          include: {
            skill: true,
          },
        },
      },
    })
  },
};

module.exports = CourseModel;
