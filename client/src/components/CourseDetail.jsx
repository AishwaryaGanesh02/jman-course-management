import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import EnrollmentStatusChart from "./Visualizations/EnrollmentStatusChart";
import EmployeeProgress from "./Visualizations/EmployeeProgress";

const CourseInformation = () => {
  const { courseId } = useParams();
  const token = Cookies.get("token");
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState(0);
  const [progressData, setProgressData] = useState([]);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1200/api/courses/${courseId}/details`,
          { headers: { authorization: `${token}` } }
        );
        console.log(response.data.data);
        setCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCourseDetails();
  }, [token, courseId]);

  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1200/api/users/employee-progress/${courseId}`,
          { headers: { authorization: `${token}` } }
        );
        const sortedProgress = response.data.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
        setProgressData(sortedProgress);
        const latestProgress = sortedProgress[0]; // Assuming this is sorted already
        setCompletedModules(latestProgress.modulesCompleted);
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };
    fetchUserProgress();
  }, [token, courseId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex">
      <Sidebar />
      <div className="m-3 sm:ml-42 md:ml-60 w-full">
        <div>
          <h1 className="font-bold text-19xl">{course.title}</h1>
          <p className="mt-2 text-lg">{course.shortIntro}</p>
          <p className="mt-1 text-sm text-gray-600">
            Source:{" "}
            <a href={course.url} className="text-blue-600 underline">
              {course.url}
            </a>
          </p>
          <div className="px-4 flex justify-between gap-8 text-center ml-5 mt-5 font-medium">
            <div className="h-28 text-black w-full rounded-2xl shadow-md shadow-primary-300 flex flex-col items-center justify-center">
              <h3>Total Time</h3>
              <p className="italic font-bold text-xl">
                {course.totalTime} hours
              </p>
            </div>
            <div className="h-28 text-black w-full rounded-2xl shadow-md shadow-primary-300 flex flex-col items-center justify-center">
              <h3>Total Modules</h3>
              <p className="italic font-bold text-xl">{course.totalModules}</p>
            </div>
            <div className="h-28 text-black w-full rounded-2xl shadow-md shadow-primary-300 flex flex-col items-center justify-center">
              <h3>Difficulty Level</h3>
              <p className="italic font-bold text-xl">{course.difficulty}</p>
            </div>
            <div className="h-28 text-black w-full rounded-2xl shadow-md shadow-primary-300 flex flex-col items-center justify-center">
              <h3>Language</h3>
              <p className="italic font-bold text-xl">{course.language}</p>
            </div>
          </div>
        </div>

        <div className="skills mt-5">
          <h3>Skills Acquired:</h3>
          <div className="grid grid-cols-2 gap-4">
            {course.skills.map((skill, index) => (
              <div key={index} className="flex items-center">
                <svg
                  className="w-4 h-4 text-green-500 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <circle cx="10" cy="10" r="4" />
                </svg>
                <span>
                  {skill.skillName} ({skill.level})
                </span>
              </div>
            ))}
          </div>
        </div>
        <EnrollmentStatusChart course={course} />
        {Cookies.get("role") === "employee" && (
          <EmployeeProgress
            completedModules={completedModules}
            progressData={progressData}
            course={course}
            courseId={courseId}
          />
        )}
      </div>
    </div>
  );
};

export default CourseInformation;
