import React from "react";
import Chart from "react-apexcharts";

const EnrollmentStatusChart = ({ course }) => {
  console.log(course);
  const donutChartOptions = {
    series: [
      course?.progressCounts?.completed || 0,
      course?.progressCounts?.in_progress || 0,
      course?.progressCounts?.not_started || 0,
    ],
    options: {
      chart: {
        type: "donut",
        height: 350,
      },
      labels: ["Completed", "In Progress", "Not Started"],
      colors: ["#76ABAE", "#9ca3af", "#31363F"],
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

  return (
    <div className="completion-chart mt-5">
      <h3 className="text-xl font-bold text-primary-300">Enrollment Status</h3>
      <Chart
        options={donutChartOptions.options}
        series={donutChartOptions.series}
        type="donut"
        height={donutChartOptions.options.chart.height}
      />
    </div>
  );
};

export default EnrollmentStatusChart;
