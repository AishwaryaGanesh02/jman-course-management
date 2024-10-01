const CourseModel = require("../models/courseModel");

// Get list of skills that a course has
exports.getCourseSkills = async (req, res) => {
  const { courseId } = req.params;
  try {
    const courseSkills = await CourseModel.getCourseSkills(parseInt(courseId));
    res.status(200).json({ skills: courseSkills });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course skills" });
  }
};

// Get list of designations a course has
exports.getCourseDesignations = async (req, res) => {
  const { courseId } = req.params;
  try {
    const designations = await CourseModel.getCourseDesignations(
      parseInt(courseId)
    );
    res.status(200).json({ designations });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch designations" });
  }
};

// Get list of courses that a user doesn't already have
exports.getAvailableCourses = async (req, res) => {
  const userId = req.userId;
  try {
    const availableCourses = await CourseModel.getAvailableCourses(userId);
    res.status(200).json({ availableCourses });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available courses" });
  }
};

// Get list of courses joined with user and progress tables
exports.getUserCoursesWithProgress = async (req, res) => {
  try {
    // Fetching the user courses with progress from the database
    const userCourses = await CourseModel.getUserCoursesWithProgress();

    // Transforming the data to include the required fields
    const transformedCourses = userCourses.map((course) => {
      const progressPercentage =
        (course.modulesCompleted / course.course.totalModules) * 100;

      return {
        courseName: course.course.title,
        username: course.user.username,
        progressPercentage: `${progressPercentage.toFixed(2)}%`,
        difficulty: course.course.difficulty,
        completionStatus: course.progressStatus,
        certificateProof: course.certificateProof,
      };
    });

    res.status(200).json(transformedCourses);
  } catch (error) {
    console.error("Error fetching user courses with progress:", error);
    res
      .status(500)
      .json({ error: "Failed to fetch user courses with progress" });
  }
};
