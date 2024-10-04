import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";
import EnrollmentStatusChart from "./Visualizations/EnrollmentStatusChart";
import EmployeeProgress from "./Visualizations/EmployeeProgress";
import DesignationProgressChart from "./Visualizations/DesignationProgressChart";

const CourseInformation = () => {
  const { courseId } = useParams();
  const token = Cookies.get("token");
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState(0);
  const [progressData, setProgressData] = useState([]);
  const [rerender, setRerender] = useState(0);

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
  }, [token, courseId, rerender]);

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
        setCompletedModules(progressData[0]?.modulesCompleted);
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };
    fetchUserProgress();
  }, [token, courseId, rerender]);
  useEffect(() => {
    setCompletedModules(progressData[0]?.modulesCompleted);
  }, [progressData]);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="flex bg-mainbg xs:w-fit sm:w-full overflow-x-auto h-full">
      <Sidebar />
      <div className="m-3 ml-64 w-full">
        <div>
          <h1 className="font-extrabold text-19xl pt-8 pb-5">{course.title}</h1>
          <p className="text-xl">{course.shortIntro}</p>
          <p className="mt-4 text-xl font-bold text-primary-300">
            Source:{" "}
            <a href={course.url} className="font-normal text-blue-600 italic">
              {course.url}
            </a>
          </p>
          <div className="cards px-4 flex justify-around gap-7 text-center mx-3 mt-7 font-medium">
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

        <div className="skills my-9">
          <h3 className="text-xl font-bold text-primary-300">Skills</h3>
          <div className="mx-5 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {course.skills.map((skill, index) => (
              <div key={index} className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20 "
                  fill="#31363F"
                  className=""
                  viewBox="0 0 16 16"
                >
                  <path d="M7.068.727c.243-.97 1.62-.97 1.864 0l.071.286a.96.96 0 0 0 1.622.434l.205-.211c.695-.719 1.888-.03 1.613.931l-.08.284a.96.96 0 0 0 1.187 1.187l.283-.081c.96-.275 1.65.918.931 1.613l-.211.205a.96.96 0 0 0 .434 1.622l.286.071c.97.243.97 1.62 0 1.864l-.286.071a.96.96 0 0 0-.434 1.622l.211.205c.719.695.03 1.888-.931 1.613l-.284-.08a.96.96 0 0 0-1.187 1.187l.081.283c.275.96-.918 1.65-1.613.931l-.205-.211a.96.96 0 0 0-1.622.434l-.071.286c-.243.97-1.62.97-1.864 0l-.071-.286a.96.96 0 0 0-1.622-.434l-.205.211c-.695.719-1.888.03-1.613-.931l.08-.284a.96.96 0 0 0-1.186-1.187l-.284.081c-.96.275-1.65-.918-.931-1.613l.211-.205a.96.96 0 0 0-.434-1.622l-.286-.071c-.97-.243-.97-1.62 0-1.864l.286-.071a.96.96 0 0 0 .434-1.622l-.211-.205c-.719-.695-.03-1.888.931-1.613l.284.08a.96.96 0 0 0 1.187-1.186l-.081-.284c-.275-.96.918-1.65 1.613-.931l.205.211a.96.96 0 0 0 1.622-.434zM12.973 8.5H8.25l-2.834 3.779A4.998 4.998 0 0 0 12.973 8.5m0-1a4.998 4.998 0 0 0-7.557-3.779l2.834 3.78zM5.048 3.967l-.087.065zm-.431.355A4.98 4.98 0 0 0 3.002 8c0 1.455.622 2.765 1.615 3.678L7.375 8zm.344 7.646.087.065z" />
                </svg>

                <span>
                  {skill.skillName} ({skill.level})
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2	">
          <EnrollmentStatusChart course={course} />
          <DesignationProgressChart
            designationProgressCounts={course.designationProgressCounts}
          />
        </div>
        {Cookies.get("role") === "employee" && (
          <EmployeeProgress
            completedModules={completedModules}
            progressData={progressData}
            course={course}
            courseId={courseId}
            rerenderflag={setRerender}
          />
        )}
      </div>
    </div>
  );
};

export default CourseInformation;
