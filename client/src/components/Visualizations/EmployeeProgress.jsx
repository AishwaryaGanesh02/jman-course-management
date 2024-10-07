import React, { useState } from "react";
import AddProgressModal from "../models_filters/AddProgressModel";
import Cookies from "js-cookie";
import axios from "axios";
import Chart from "react-apexcharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeProgress = ({
  completedModules,
  progressData,
  course,
  courseId,
  rerenderflag,
}) => {
  const token = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);
  const totalModules = course.totalModules;

  const handleAddProgress = async (newProgress) => {
    const employeeId = Cookies.get("userid");
    const updatedProgress = {
      ...newProgress,
      employeeId,
      courseId,
      action: "updated",
      skills: course.skills,
    };

    try {
      const response = await axios.post(
        "http://localhost:1200/api/users/add-employee-progress",
        updatedProgress,
        {
          headers: {
            authorization: `${token}`,
          },
        }
      );
      toast.success(response.data.message);
      setShowModal(false);
      rerenderflag(Math.floor(Math.random() * 1000));
    } catch (error) {
      toast.error("Error updating progress");
    }
  };

  const radialBarOptions = {
    series: [(completedModules / totalModules) * 100],
    options: {
      chart: {
        type: "radialBar",
        height: 350,
      },
      plotOptions: {
        radialBar: {
          hollow: {
            size: "65%",
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
              color: "#111",
              fontSize: "30px",
              formatter: (val) => val.toFixed(2) + "%",
            },
          },
        },
      },
      labels: ["Completed Modules"],
      fill: {
        colors: ["#76ABAE"],
      },

      tooltip: {
        enabled: true,
        theme: "dark",
        y: {
          formatter: function (val) {
            return `${completedModules}`;
          },
        },
      },
    },
  };

  return (
    <div className="employee-progress mt-5 m-5">
      <ToastContainer />
      <h1 className="text-xl font-bold text-primary-300">Your Progress</h1>
      <div className="flex items-center ">
        <div className="meter-gauge basis-1/2">
          <Chart
            options={radialBarOptions.options}
            series={radialBarOptions.series}
            type="radialBar"
            height={radialBarOptions.options.chart.height}
          />
        </div>
        <div className="basis-1/2">
          <div className="flex justify-center mb-4">
            <button
              onClick={() => setShowModal(true)}
              className={`w-64 border border-primary-300 rounded-md text-center transition duration-300 
            ${
              progressData[0]?.modulesCompleted === totalModules
                ? "bg-gray-300 text-gray-400 cursor-not-allowed"
                : "bg-white hover:bg-primary-200 shadow-md"
            } 
            px-4 py-2`}
              disabled={progressData[0]?.modulesCompleted === totalModules}
            >
              Update Your Progress
            </button>
          </div>

          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 uppercase bg-primary-300">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Modules Completed
                  </th>
                </tr>
              </thead>
              <tbody className="bg-bg">
                {progressData.length > 0 ? (
                  progressData.map((item) => (
                    <tr
                      key={item.id}
                      className="odd:bg-white even:bg-gray-50 border-b"
                    >
                      <td className="px-6 py-4">
                        {new Date(item.lastUpdated).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">{item.progressStatus}</td>
                      <td className="px-6 py-4">{item.modulesCompleted}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="px-6 py-4 text-center">
                      No progress data available
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {showModal && (
            <AddProgressModal
              onClose={() => setShowModal(false)}
              onAddProgress={handleAddProgress}
              totalModules={totalModules}
              completedModules={progressData[0]?.modulesCompleted}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeProgress;
