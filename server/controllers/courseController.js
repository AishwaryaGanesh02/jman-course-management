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
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  };
  try {
    const availableCourses = await CourseModel.getAvailableCourses(userId);
    res.status(200).json(availableCourses);
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

exports.getCourseDetails = async (req, res) => {
  const { courseId } = req.params;

  try {
    const courseDetails = await CourseModel.getCourseDetailsWithProgress(courseId);
    const skills = courseDetails.skills.map(cs => ({
      skillName: cs.skill.name,
      level: cs.level,
      skillId: cs.skillId
    }));
    const response = {
      data: {
        title: courseDetails.course.title,
        url: courseDetails.course.url,
        shortIntro: courseDetails.course.shortIntro,
        difficulty: courseDetails.course.difficulty,
        language: courseDetails.course.language,
        totalTime: courseDetails.course.totalTime,
        totalModules: courseDetails.course.totalModules,
        skills: skills,//.map((courseSkill) => courseSkill.name),
        progressCounts: courseDetails.progressCounts,  // Include progress entries here
      },
    };

    res.json(response);
  } catch (error) {
    console.error("Error fetching course details:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get list of courses
exports.getAllCourses = async (req, res) => {
  try {
    const courses = await CourseModel.getAllCourses();
    const coursesWithDetails = courses.map(course => ({
      id: course.id,
      title: course.title,
      url: course.url,
      shortIntro: course.shortIntro,
      difficulty: course.difficulty,
      language: course.language,
      totalTime: course.totalTime,
      totalModules: course.totalModules,
      skills: course.courseSkills.map(courseSkill => courseSkill.skill.name),
    }));

    res.status(200).json(coursesWithDetails);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};
