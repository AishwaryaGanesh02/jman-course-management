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

    // Fetch progress entries along with user and designation
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

    // Initialize counts
    const statusCounts = {
      not_started: 0,
      in_progress: 0,
      completed: 0,
    };

    const designationProgressCounts = {};

    // Populate counts
    progressEntries.forEach(({ user, progressStatus }) => {
      // Update global status counts
      if (progressStatus in statusCounts) {
        statusCounts[progressStatus] += 1;
      }

      // Update designation progress counts
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
