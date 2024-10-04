import React from "react";
import Chart from "react-apexcharts";

const DesignationProgressChart = ({ designationProgressCounts }) => {
  const designations = Object.keys(designationProgressCounts);
  const notStartedCounts = designations.map(
    (designation) => designationProgressCounts[designation].not_started
  );
  const inProgressCounts = designations.map(
    (designation) => designationProgressCounts[designation].in_progress
  );
  const completedCounts = designations.map(
    (designation) => designationProgressCounts[designation].completed
  );

  const barChartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    colors: ["#31363F", "#9ca3af", "#76ABAE"],
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
        columnWidth: "55%",
      },
    },
    dataLabels: {
      enabled: true,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: designations,
      title: {
        text: "Designations",
      },
    },
    yaxis: {
      title: {
        text: "Number of Employees",
      },
      labels: {
        formatter: function (val) {
          return Math.floor(val);
        },
      },
      min: 0,
      max:
        Math.max(...notStartedCounts, ...inProgressCounts, ...completedCounts) +
        1,
      forceNiceScale: true,
    },
    legend: {
      position: "bottom",
      horizontalAlign: "center",
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} employees`,
      },
    },
  };

  const barChartSeries = [
    {
      name: "Not Started",
      data: notStartedCounts,
    },
    {
      name: "In Progress",
      data: inProgressCounts,
    },
    {
      name: "Completed",
      data: completedCounts,
    },
  ];

  return (
    <div className="designation-progress-chart mt-5">
      <h3 className="text-xl font-bold text-primary-300">
        Designation Progress
      </h3>
      <Chart
        options={barChartOptions}
        series={barChartSeries}
        type="bar"
        height={barChartOptions.chart.height}
      />
    </div>
  );
};

export default DesignationProgressChart;
