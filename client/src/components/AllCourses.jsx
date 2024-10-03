import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar"; // Existing sidebar component
import CourseFilters from "./CourseFilters"; // New combined filter component
import { Link } from "react-router-dom"; // Import Link

const AllCourses = () => {
  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState([]); // State for selected difficulties
  const [selectedLanguages, setSelectedLanguages] = useState([]); // State for selected languages
  const [search, setSearch] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  const [difficultyLevels] = useState(["Beginner", "Intermediate", "Advanced"]); // Difficulty levels can be hardcoded or fetched from an API

  const token = Cookies.get("token");
  const role = Cookies.get("role");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get("http://localhost:1200/api/courses", {
          headers: {
            authorization: `${token}`,
          },
        });
        setCourses(response.data);
        setFilteredCourses(response.data);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    const fetchSkills = async () => {
      try {
        const response = await axios.get("http://localhost:1200/api/skills");
        setSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchCourses();
    fetchSkills();
  }, [token]);

  useEffect(() => {
    const filterCourses = () => {
      const filtered = courses.filter((course) => {
        const matchesDifficulty =
          selectedDifficulties.length > 0
            ? selectedDifficulties.includes(course.difficulty)
            : true;

        const matchesLanguage =
          selectedLanguages.length > 0
            ? selectedLanguages.includes(course.language)
            : true;

        const matchesSearch = search
          ? course.title.toLowerCase().includes(search.toLowerCase())
          : true;

        const matchesSkills =
          selectedSkills.length > 0
            ? selectedSkills.some((skill) => course.skills.includes(skill))
            : true;

        return (
          matchesDifficulty && matchesLanguage && matchesSearch && matchesSkills
        );
      });
      setFilteredCourses(filtered);
    };

    filterCourses();
  }, [
    selectedDifficulties,
    selectedLanguages,
    search,
    selectedSkills,
    courses,
  ]);

  const statusStyles = {
    in_progress: { label: "In Progress", color: "text-yellow-500" },
    not_started: { label: "Not Started", color: "text-red-500" },
    completed: { label: "Completed", color: "text-green-500" },
  };

  // Function to group courses by progressStatus
  const groupCoursesByProgress = () => {
    return filteredCourses.reduce((acc, course) => {
      if (!acc[course.progressStatus]) {
        acc[course.progressStatus] = [];
      }
      acc[course.progressStatus].push(course);
      return acc;
    }, {});
  };

  // Grouped courses
  const groupedCourses = groupCoursesByProgress();
  const orderedCourses = {
    in_progress: groupedCourses.in_progress || [],
    not_started: groupedCourses.not_started || [],
    completed: groupedCourses.completed || [],
  };
  console.log(orderedCourses);
  return (
    <div className="flex bg-mainbg h-screen">
      <Sidebar />
      <div className="ml-64 w-full h-screen overflow-y-auto flex flex-col">
        <h1 className="font-extrabold text-19xl py-8">View All Courses</h1>
        <div className="flex mr-5 p-4 bg-bg shadow shadow-gray-400	">
          <CourseFilters
            skills={skills}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            languages={[...new Set(courses.map((course) => course.language))]}
            selectedLanguages={selectedLanguages}
            setSelectedLanguages={setSelectedLanguages}
            difficultyLevels={difficultyLevels}
            selectedDifficulties={selectedDifficulties}
            setSelectedDifficulties={setSelectedDifficulties}
          />

          <div className="flex-grow mx-7">
            <div className="mb-4 flex">
              <input
                type="text"
                placeholder="Search courses..."
                className="border rounded p-2 w-full"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            {role == "employee" ? (
              Object.keys(orderedCourses).map((status) => {
                const { label, color } = statusStyles[status] || {
                  label: status,
                  color: "text-gray-500",
                };
                return (
                  <div key={status} className="mb-8 p-3">
                    <h2 className={`font-bold text-xl ${color}`}>{label}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                      {orderedCourses[status].map((course) => (
                        <Link to={`/courseInfo/${course.id}`} key={course.id}>
                          <div className="bg-white border rounded-lg p-4 shadow-md rounded-2xl shadow-md shadow-primary-300">
                            <h2 className="text-xl font-bold truncate">
                              {course.title}
                            </h2>
                            <p className="mt-2 truncate">
                              {course.shortIntro || "No description available."}
                            </p>
                            <p className="mt-2">
                              Total Time: {course.totalTime} mins
                            </p>
                            <p>Total Modules: {course.totalModules}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCourses.map((course) => (
                  <Link to={`/courseInfo/${course.id}`} key={course.id}>
                    <div className="border rounded-lg p-4 shadow-md rounded-2xl shadow-md shadow-primary-300">
                      <h2 className="text-xl font-bold truncate">
                        {course.title}
                      </h2>
                      <p className="mt-2 truncate">
                        {course.shortIntro || "No description available."}
                      </p>
                      <p className="mt-2">
                        Total Time: {course.totalTime} mins
                      </p>
                      <p>Total Modules: {course.totalModules}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllCourses;
