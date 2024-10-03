import React, { useState, useEffect } from "react";
import AddProgressModal from "../AddProgressModel"; // A modal component for updating progress
import Cookies from "js-cookie";
import axios from "axios";
import Chart from "react-apexcharts";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EmployeeProgress = ({ completedModules, progressData, course }) => {
  const token = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);
  const totalModules = course.totalModules;

  const handleAddProgress = async (newProgress) => {
    console.log(newProgress);
    setShowModal(false);
    // try {
    //   await axios.post(
    //     "http://localhost:1200/api/users/update-progress",
    //     newProgress,
    //     {
    //       headers: {
    //         authorization: `${token}`,
    //       },
    //     }
    //   );
    //   setProgressData((prev) => [...prev, newProgress]);
    //   setShowModal(false);
    //   toast.success("Progress updated successfully!");
    // } catch (error) {
    //   console.error("Error updating progress:", error);
    //   toast.error("Failed to update progress.");
    // }
  };

  const radialBarOptions = {
    series: [(completedModules / course.totalModules) * 100],
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
                return `${completedModules} / ${totalModules}`;
              },
              color: "#111",
              fontSize: "30px",
            },
          },
        },
      },
      labels: ["Completed Modules"],
      fill: {
        colors: ["#00E396"],
      },
    },
  };

  return (
    <div className="flex">
      <div className="m-3 sm:ml-42 md:ml-60">
        <ToastContainer />
        <h1 className="font-extrabold text-2xl text-center">
          Employee Progress
        </h1>
        <div className="meter-gauge mt-5">
          <h3>Completed Modules</h3>
          <Chart
            options={radialBarOptions.options}
            series={radialBarOptions.series}
            type="radialBar"
            height={radialBarOptions.options.chart.height}
          />
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => setShowModal(true)}
            className={`w-64 border border-primary-300 rounded-md text-center gap-2 transition duration-300 
      ${
        progressData[0].modulesCompleted === totalModules
          ? "bg-transparent text-gray-400 cursor-not-allowed shadow-sm"
          : "bg-white hover:text-white hover:bg-primary-200 shadow-md"
      } px-4 py-2`}
            disabled={progressData[0].modulesCompleted === totalModules}
          >
            Update Progress
          </button>
        </div>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
            <tbody>
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
            completedModules={progressData[0].modulesCompleted}
          />
        )}
      </div>
    </div>
  );
};

export default EmployeeProgress;
