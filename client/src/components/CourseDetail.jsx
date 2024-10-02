import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import Sidebar from "./Sidebar";
import Cookies from "js-cookie";
import axios from "axios";
import { useParams } from "react-router-dom";

const CourseInformation = () => {
  const { courseId } = useParams();
  const token = Cookies.get("token");
  const userRole = Cookies.get("role");
  const [course, setCourse] = useState();
  const [loading, setLoading] = useState(true);
  const [completedModules, setCompletedModules] = useState(0);
  const [progressData, setProgressData] = useState([]);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      console.log("----------S");
      try {
        const response = await axios.get(
          `http://localhost:1200/api/courses/${courseId}/details`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );

        console.log(response.data, "--------");
        setCourse(response.data.data);
      } catch (error) {
        console.error("Error fetching course details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [token, courseId]);

  // Fetch user progress from the API
  useEffect(() => {
    const fetchUserProgress = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1200/api/users/employee-progress/${courseId}`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );

        const progressResponse = response.data;

        const sortedProgress = progressResponse.sort(
          (a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated)
        );
        setProgressData(sortedProgress);

        const latestProgress = progressResponse.reduce((latest, current) => {
          return new Date(current.lastUpdated) > new Date(latest.lastUpdated)
            ? current
            : latest;
        }, progressResponse[0]);

        // Set completed modules based on the latest progress
        setCompletedModules(latestProgress.modulesCompleted);
      } catch (error) {
        console.error("Error fetching user progress:", error);
      }
    };

    fetchUserProgress();
  }, [token]);

  // Donut chart options (added checks for course)
  const donutChartOptions = {
    series: [
      course?.progressCounts?.completed || 0,
      course?.progressCounts?.in_progress || 0,
      course?.progressCounts?.not_started || 0,
    ],
    options: {
      chart: {
        type: "donut",
        height: 280,
      },
      labels: ["Completed", "In Progress", "Not Started"],
      colors: ["#4CAF50", "#FFEB3B", "#F44336"], // Green for completed, Yellow for in progress, Red for not started
      legend: {
        position: "bottom",
      },
      dataLabels: {
        enabled: true,
        dropShadow: {
          enabled: false,
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return `${val} employees`;
          },
        },
      },
      plotOptions: {
        pie: {
          donut: {
            size: "65%",
            background: "transparent",
            labels: {
              show: true,
              name: {
                show: true,
                fontSize: "22px",
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                showAlways: false,
                label: "Total",
                fontSize: "22px",
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return a + b;
                  }, 0);
                },
              },
            },
          },
        },
      },
    },
  };

  // Radial bar gauge options
  const radialBarOptions = {
    series: [(completedModules / course?.totalModules) * 100],
    options: {
      chart: {
        type: "radialBar",
        height: 280,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "70%",
          },
          dataLabels: {
            show: true,
            name: {
              show: true,
              color: "#888",
              fontSize: "13px",
            },
            value: {
              show: true,
              formatter: function () {
                return `${completedModules} / ${course?.totalModules}`;
              },
              color: "#111",
              fontSize: "30px",
            },
          },
        },
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Completed Modules"],
      fill: {
        colors: ["#00E396"],
      },
    },
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading state while fetching data
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="m-3 sm:ml-42 md:ml-60">
        <h1 className="font-bold text-4xl text-center">{course.title}</h1>
        {/* {userRole === "admin" && (
          <button className="ml-4 bg-blue-500 text-white px-3 py-1 rounded">
            Edit
          </button>
        )} */}
        <p className="mt-2 text-lg">{course.shortIntro}</p>
        <p className="mt-1 text-sm text-gray-600">
          Source:{" "}
          <a href={course.url} className="text-blue-600 underline">
            {course.url}
          </a>
        </p>
        <div className="cards mt-5 grid grid-cols-2 gap-4">
          <div className="card p-4 border rounded shadow">
            <h3>Total Time</h3>
            <p>{course.totalTime} hours</p>
          </div>
          <div className="card p-4 border rounded shadow">
            <h3>Total Modules</h3>
            <p>{course.totalModules}</p>
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="card p-4 border rounded shadow">
            <h3>Difficulty Level</h3>
            <p>{course.difficulty}</p>
          </div>
          <div className="card p-4 border rounded shadow">
            <h3>Language</h3>
            <p>{course.language}</p>
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
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div className="completion-chart mt-5">
          <h3>Enrollment Status</h3>
          <Chart
            options={donutChartOptions.options}
            series={donutChartOptions.series}
            type="donut"
            height={donutChartOptions.options.chart.height}
          />
        </div>
        {userRole === "employee" && (
          <div>
            <div className="meter-gauge mt-5">
              <h3>Completed Modules</h3>
              <Chart
                options={radialBarOptions.options}
                series={radialBarOptions.series}
                type="radialBar"
                height={radialBarOptions.options.chart.height}
              />
            </div>
            <h2>Employee Progress</h2>
            <table className="min-w-full bg-white border border-gray-200">
              <thead>
                <tr className="bg-gray-200 text-gray-700">
                  <th className="py-2 px-4 border-b">Date</th>
                  <th className="py-2 px-4 border-b">Status</th>
                  <th className="py-2 px-4 border-b">Modules Completed</th>
                </tr>
              </thead>
              <tbody>
                {progressData.map((item) => (
                  <tr key={item.id} className="hover:bg-gray-100 text-center">
                    <td className="py-2 px-4 border-b">
                      {new Date(item.lastUpdated).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {item.progressStatus}
                    </td>
                    <td className="py-2 px-4 border-b">
                      {item.modulesCompleted}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default CourseInformation;
