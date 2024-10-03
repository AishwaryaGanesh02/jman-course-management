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
        user: {
          select: {
            id: true,
            username: true, // Include other user details as needed
            designation: true, // Include the designation field
          },
        },
      },
    });

    // Create a map to store the latest entry for each user-course combination
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

    // Map the results to include user designation
    return Object.values(latestEntries).map((entry) => ({
      ...entry,
      user: {
        id: entry.user.id,
        username: entry.user.username,
        designation: entry.user.designation.name,
      },
      course: entry.course, // You can include other course details as needed
    }));
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
      by: ["progressStatus"],
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

    progressCounts.forEach((entry) => {
      if (entry.progressStatus in statusCounts) {
        statusCounts[entry.progressStatus] = entry._count.userId;
      }
    });

    return {
      course,
      skills,
      progressCounts: statusCounts,
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
              skill: true, // This fetches the Skill details for each CourseSkill
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
          id: true, // Only select the course ID
        },
      });

      return courses.map((course) => course.id); // Return an array of course IDs
    } catch (error) {
      throw new Error("Error fetching course IDs: " + error.message);
    }
  },
  getAllCourseIds: async () => {
    try {
      const courses = await prisma.course.findMany({
        select: {
          id: true, // Only select the course ID
        },
      });

      return courses.map((course) => course.id); // Return an array of all course IDs
    } catch (error) {
      throw new Error("Error fetching all course IDs: " + error.message);
    }
  },
};

module.exports = CourseModel;
