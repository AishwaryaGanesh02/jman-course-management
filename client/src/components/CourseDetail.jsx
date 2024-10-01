import React from "react";
import Chart from "react-apexcharts";

const CourseInformation = () => {
  const course = {
    title: "Web Development Bootcamp",
    description:
      "Learn how to build websites from scratch using HTML, CSS, and JavaScript.",
    totalTime: 40, // in hours
    modules: [
      { name: "Introduction to HTML", completed: true },
      { name: "CSS Basics", completed: true },
      { name: "JavaScript Fundamentals", completed: false },
      { name: "Advanced JavaScript", completed: false },
      { name: "React Basics", completed: true },
      { name: "Node.js Introduction", completed: false },
      { name: "Express.js Basics", completed: true },
    ],
    difficulty: "Intermediate", // 1 to 5 scale
    skills: ["HTML", "CSS", "JavaScript", "React", "Node.js"],
    role: "employee", // or "admin"
  };

  const totalModules = course.modules.length;
  const completedModules = course.modules.filter((mod) => mod.completed).length;

  // Data for the donut chart
  const donutChartOptions = {
    series: [completedModules, totalModules - completedModules],
    options: {
      chart: {
        type: "donut",
        height: 280,
      },
      labels: ["Completed", "Not Completed"],
      colors: ["#36A2EB", "#FF6384"],
      legend: {
        position: "bottom",
      },
      dataLabels: {
        enabled: true,
      },
    },
  };

  // Data for the radial bar gauge
  const radialBarOptions = {
    series: [(completedModules / totalModules) * 100],
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
      stroke: {
        lineCap: "round",
      },
      labels: ["Completed Modules"],
      fill: {
        colors: ["#00E396"],
      },
    },
  };

  return (
    <div className="course-info p-5">
      <h2 className="text-3xl font-bold">{course.title}</h2>
      <p className="mt-2 text-lg">{course.description}</p>

      <div className="cards mt-5 grid grid-cols-2 gap-4">
        <div className="card p-4 border rounded shadow">
          <h3>Total Time</h3>
          <p>{course.totalTime} hours</p>
        </div>
        <div className="card p-4 border rounded shadow">
          <h3>Total Modules</h3>
          <p>{totalModules}</p>
        </div>
      </div>

      <div className="difficulty mt-5">
        <h3>Difficulty Level:</h3>
        <div className="flex">
          {Array.from({ length: 5 }, (_, index) => (
            <span
              key={index}
              className={
                index < course.difficulty ? "text-yellow-500" : "text-gray-300"
              }
            >
              ★
            </span>
          ))}
        </div>
      </div>

      <div className="skills mt-5">
        <h3>Skills Acquired:</h3>
        <ul className="list-disc pl-5">
          {course.skills.map((skill, index) => (
            <li key={index} className="flex items-center">
              <svg
                className="w-4 h-4 text-green-500 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <circle cx="10" cy="10" r="4" />
              </svg>
              {skill}
            </li>
          ))}
        </ul>
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

      {/* Radial bar chart for completed modules */}
      <div className="meter-gauge mt-5">
        <h3>Completed Modules</h3>
        <Chart
          options={radialBarOptions.options}
          series={radialBarOptions.series}
          type="radialBar"
          height={radialBarOptions.options.chart.height}
        />
      </div>
    </div>
  );
};

export default CourseInformation;
