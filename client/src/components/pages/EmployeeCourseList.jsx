import React, { useState, useEffect } from "react";
import Sidebar from "../common/Sidebar";
import Cookies from "js-cookie";
import axios from "axios";
import AssignCourseModal from "../models_filters/AssignCourseModel";
import ProgressFilter from "../models_filters/ProgressFilter";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeCourseList = () => {
  const token = Cookies.get("token");
  const [coursesData, setCoursesData] = useState([]);
  const [sortOption, setSortOption] = useState("completionStatus");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [designations, setDesignations] = useState([]);
  const [selectedDesignation, setSelectedDesignation] = useState([]);
  const [statuses] = useState(["completed", "in_progress", "not_started"]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [usernames, setUsernames] = useState([]);
  const [selectedUsername, setSelectedUsername] = useState([]);
  const [difficultyLevels] = useState(["Beginner", "Intermediate", "Advanced"]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]);

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
      toast.success(response.data.message);

      setIsModalOpen(false);
    } catch (error) {
      toast.error("Error assigning course.");
    }
  };

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1200/api/courses/user/progress",
          { headers: { authorization: `${token}` } }
        );
        setCoursesData(response.data);

        const uniqueDesignations = [
          ...new Set(response.data.map((course) => course.userDesignation)),
        ];
        const uniqueUsernames = [
          ...new Set(response.data.map((course) => course.username)),
        ];

        setDesignations(uniqueDesignations);
        setUsernames(uniqueUsernames);
      } catch (error) {
        toast.error("Error fetching courses. Please try again later.");
      }
    };

    fetchCourses();
  }, [token, isModalOpen]);

  const filteredCourses = coursesData.filter((course) => {
    const matchesDesignation =
      selectedDesignation.length === 0 ||
      selectedDesignation.includes(course.userDesignation);
    const matchesStatus =
      selectedStatus.length === 0 ||
      selectedStatus.includes(course.completionStatus);
    const matchesUsername =
      selectedUsername.length === 0 ||
      selectedUsername.includes(course.username);
    const matchesDifficulty =
      selectedDifficulties.length === 0 ||
      selectedDifficulties.includes(course.difficulty);
    const matchesSearch = course.courseName
      .toLowerCase()
      .includes(search.toLowerCase());

    return (
      matchesDesignation &&
      matchesStatus &&
      matchesUsername &&
      matchesDifficulty &&
      matchesSearch
    );
  });

  const sortedCourses = [...filteredCourses].sort((a, b) => {
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
    <div className="flex bg-mainbg h-full">
      <Sidebar />
      <div className="ml-64 w-full h-full flex flex-col">
        <h1 className="font-extrabold text-19xl py-8">
          Employee Course Progress
        </h1>
        <div className="mr-5 p-4 bg-bg h-full shadow shadow-gray-400 ">
          <div className="flex gap-5 flex-grow">
            <ProgressFilter
              designations={designations}
              selectedDesignation={selectedDesignation}
              setSelectedDesignation={setSelectedDesignation}
              statuses={statuses}
              selectedStatus={selectedStatus}
              setSelectedStatus={setSelectedStatus}
              usernames={usernames}
              selectedUsername={selectedUsername}
              setSelectedUsername={setSelectedUsername}
              difficultyLevels={difficultyLevels}
              selectedDifficulties={selectedDifficulties}
              setSelectedDifficulties={setSelectedDifficulties}
            />

            <div className="flex-grow mr-5">
              <div className="flex gap-10 justify-between mb-4 mr-5">
                <div className="basis-3/4 rounded h-12 ">
                  <div className="mb-4 flex items-center gap-2 border rounded p-2 w-full bg-white rounded shadow-md">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="#9ca3af"
                      className="bi bi-search"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search courses..."
                      className="w-full bg-white focus:outline-none"
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                </div>
                <button
                  onClick={handleOpenModal}
                  className="basis-1/4 w-64 h-10 sm:w-40 border border-primary-300 rounded-md text-center gap-2 transition duration-300 bg-white hover:text-white hover:bg-primary-200 shadow-md px-4 py-2"
                >
                  Assign Course
                </button>
              </div>

              {isModalOpen && (
                <AssignCourseModal
                  onClose={handleCloseModal}
                  onAssignCourse={handleAssignCourse}
                />
              )}
              <div className="mb-4 flex items-center">
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
              <div className="w-full h-screen overflow-scroll shadow-md sm:rounded-lg">
                <table className="min-w-full text-sm text-left text-gray-500">
                  <thead className="text-xs text-gray-700 uppercase bg-primary-300">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Course Title
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Employee Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Employee Designation
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Difficulty
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Progress Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-bg">
                    {sortedCourses.length > 0 ? (
                      sortedCourses.map((course, index) => (
                        <tr key={index} className="border-b">
                          <td className="px-6 py-4 font-medium text-gray-900">
                            {course.courseName}
                          </td>
                          <td className="px-6 py-4">{course.username}</td>
                          <td className="px-6 py-4">
                            {course.userDesignation}
                          </td>
                          <td className="px-6 py-4">{course.difficulty}</td>
                          <td className="px-6 py-4 flex items-center gap-3 justify-between relative">
                            {course.progressPercentage}
                            {course.completionStatus === "completed" && (
                              <button
                                onClick={() =>
                                  handleOpenCertificate(course.certificateProof)
                                }
                                className="ml-2 px-4 py-2 bg-white border border-primary-300 rounded-md text-center gap-2 transition duration-300 hover:text-white hover:bg-primary-200 shadow-md"
                              >
                                View Certificate
                              </button>
                            )}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="5" className="px-6 py-4 text-center">
                          No courses available
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCourseList;
