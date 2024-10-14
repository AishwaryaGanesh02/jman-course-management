const CourseModel = require("../models/courseModel");
const axios = require("axios");

// Get list of skills associated with a course
exports.getCourseSkills = async (req, res) => {
  const { courseId } = req.params;
  try {
    const courseSkills = await CourseModel.getCourseSkills(parseInt(courseId));
    res.status(200).json({ skills: courseSkills });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch course skills" });
  }
};

// Get list of courses not already taken by a user
exports.getAvailableCourses = async (req, res) => {
  const userId = parseInt(req.params.id, 10);
  if (isNaN(userId)) {
    return res.status(400).json({ error: "Invalid user ID" });
  }
  try {
    const availableCourses = await CourseModel.getAvailableCourses(userId);
    res.status(200).json(availableCourses);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch available courses" });
  }
};

// Get recommended courses
exports.getRecommendations = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    const response = await axios.get(
      `http://127.0.0.1:5000/recommendations?employeeId=${employeeId}`
    );
    console.log(response.data);
    res.json(response.data);
  } catch (error) {
    console.log("--", error);
    res.status(error.response?.status || 500).json({ message: error.message });
  }
};

// Get list of user courses with progress details
exports.getUserCoursesWithProgress = async (req, res) => {
  try {
    const userCourses = await CourseModel.getUserCoursesWithProgress();
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
        userDesignation: course.user.designation,
      };
    });
    res.status(200).json(transformedCourses);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to fetch user courses with progress" });
  }
};

// Get detailed information about a specific course
exports.getCourseDetails = async (req, res) => {
  const { courseId } = req.params;
  try {
    const courseDetails = await CourseModel.getCourseDetailsWithProgress(
      courseId
    );
    const skills = courseDetails.skills.map((cs) => ({
      skillName: cs.skill.name,
      level: cs.level,
      skillId: cs.skillId,
    }));
    const response = {
      data: {
        title: courseDetails.course.title,
        url: courseDetails.course.url,
        shortIntro: courseDetails.course.shortIntro,
        difficulty: courseDetails.course.difficulty,
        language: courseDetails.course.language,
        totalTime: courseDetails.course.totalTime,
        designationProgressCounts: courseDetails.designationProgressCounts,
        totalModules: courseDetails.course.totalModules,
        skills: skills,
        progressCounts: courseDetails.progressCounts,
      },
    };
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get list of all courses
exports.getAllCourses = async (req, res) => {
  const role = req.role;
  const userId = req.userId;
  try {
    const courses = await CourseModel.getAllCourses(role, userId);
    const coursesWithDetails = courses.map((course) => {
      let progressStatus = null;
      if (role === "employee") {
        const latestProgress = course.EmployeeProgress.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        )[0];
        progressStatus = latestProgress ? latestProgress.progressStatus : null;
      }
      return {
        id: course.id,
        title: course.title,
        url: course.url,
        shortIntro: course.shortIntro,
        difficulty: course.difficulty,
        language: course.language,
        totalTime: course.totalTime,
        totalModules: course.totalModules,
        progressStatus: progressStatus,
        skills: course.courseSkills.map(
          (courseSkill) => courseSkill.skill.name
        ),
      };
    });
    res.status(200).json(coursesWithDetails);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch courses" });
  }
};

// Get course IDs for a user or all courses based on role
exports.getCourseId = async (req, res) => {
  const userId = req.userId;
  const userRole = req.role;
  try {
    let courseIds;
    if (userRole == "employee") {
      courseIds = await CourseModel.getCourseIdsByUserId(userId);
    } else {
      courseIds = await CourseModel.getAllCourseIds();
    }
    return res.json(courseIds);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "An error occurred while fetching course IDs." });
  }
};
