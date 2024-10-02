import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import axios from "axios";
import AssignCourseModal from "./AssignCourseModel";

const EmployeeCourseList = () => {
  const token = Cookies.get("token");
  const [coursesData, setCoursesData] = useState([]);
  const [sortOption, setSortOption] = useState("completionStatus");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAssignCourse = async (courseData) => {
    try {
      const response = await axios.post(
        "http://localhost:1200/api/users/add-employee-progress",
        courseData,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      alert(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding skill:", error);
    }
    console.log("Course assigned:", courseData);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1200/api/courses/user/progress",
          { headers: { authorization: `${token}` } }
        );
        setCoursesData(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, [token, isModalOpen]);

  const getRowColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100";
      case "in_progress":
        return "bg-yellow-100";
      case "not_started":
        return "bg-red-100";
      default:
        return "";
    }
  };

  const sortedCourses = [...coursesData].sort((a, b) => {
    if (sortOption === "completionStatus") {
      return a.completionStatus.localeCompare(b.completionStatus);
    } else if (sortOption === "difficulty") {
      return a.difficulty.localeCompare(b.difficulty);
    }
    return 0;
  });

  const handleOpenCertificate = (url) => {
    window.open(url, "_blank");
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-3 sm:ml-42 md:ml-60">
        <h1 className="font-extrabold text-2xl text-center">
          User Course Progress
        </h1>
        <button
          onClick={handleOpenModal}
          className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
        >
          Assign Course
        </button>

        {isModalOpen && (
          <AssignCourseModal
            onClose={handleCloseModal}
            onAssignCourse={handleAssignCourse}
          />
        )}

        <div className="mb-4">
          <label className="mr-2">Sort by:</label>
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="border rounded p-1"
          >
            <option value="completionStatus">Completion Status</option>
            <option value="difficulty">Difficulty</option>
          </select>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Course Title
                </th>
                <th scope="col" className="px-6 py-3">
                  Employee Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Difficulty
                </th>
                <th scope="col" className="px-6 py-3">
                  Progress Status
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedCourses.length > 0 ? (
                sortedCourses.map((course, index) => (
                  <tr
                    key={index}
                    className={`border-b dark:border-gray-700 ${getRowColor(
                      course.completionStatus
                    )}`}
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {course.courseName}
                    </td>
                    <td className="px-6 py-4">{course.username}</td>
                    <td className="px-6 py-4">{course.difficulty}</td>
                    <td className="px-6 py-4 flex items-center relative">
                      {course.progressPercentage}
                      {course.completionStatus === "completed" && (
                        <button
                          onClick={() =>
                            handleOpenCertificate(course.certificateProof)
                          }
                          className="ml-2 px-2 py-1 bg-blue-500 text-white rounded"
                        >
                          View Certificate
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="px-6 py-4 text-center">
                    No courses available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCourseList;
