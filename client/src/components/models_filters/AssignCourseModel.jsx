import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignCourseModal = ({ onClose, onAssignCourse }) => {
  const [employees, setEmployees] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [courseDetails, setCourseDetails] = useState(null);
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:1200/api/users/", {
          headers: {
            authorization: `${token}`,
          },
        });
        setEmployees(
          response.data.filter(
            (employee) => employee.id !== parseInt(Cookies.get("userid"))
          )
        );
      } catch (error) {
        toast.error("Error fetching employees. Please try again later.");
      }
    };

    fetchEmployees();
  }, [token]);

  useEffect(() => {
    const fetchCourses = async () => {
      if (selectedEmployee) {
        try {
          const response = await axios.get(
            `http://localhost:1200/api/courses/available/${selectedEmployee}`,
            {
              headers: {
                authorization: `${token}`,
              },
            }
          );
          setCourses(response.data);
        } catch (error) {
          toast.error("Error fetching courses. Please try again later.");
        }
      }
    };

    fetchCourses();
  }, [selectedEmployee, token]);

  const handleEmployeeChange = (event) => {
    setSelectedEmployee(event.target.value);
    setSelectedCourse("");
    setCourseDetails(null);
  };

  const handleCourseChange = (event) => {
    const courseId = event.target.value;
    setSelectedCourse(courseId);

    const selectedCourseDetails = courses.find(
      (course) => course.id === parseInt(courseId)
    );
    setCourseDetails(selectedCourseDetails);
  };

  const handleSave = () => {
    if (!selectedEmployee || !selectedCourse) {
      return toast.error("Please select an employee and a course.");
    }

    const body = {
      employeeId: selectedEmployee,
      courseId: selectedCourse,
      progressStatus: "not_started",
      modulesCompleted: 0,
      certificateProof: null,
      action: "assigned",
    };

    onAssignCourse(body);
    toast.success("Course assigned successfully!");
  };

  const handleClose = () => {
    onClose();
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <ToastContainer />
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h1 className="text-center font-bold text-5xl">Assign Course</h1>
              <div className="mb-4">
                <label
                  htmlFor="employee-dropdown"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Employee
                </label>
                <select
                  id="employee-dropdown"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={selectedEmployee}
                  onChange={handleEmployeeChange}
                >
                  <option value="">--Select an employee--</option>
                  {employees.map((employee) => (
                    <option key={employee.id} value={employee.id}>
                      {`${employee.username} (${employee.designation})`}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="course-dropdown"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Course
                </label>
                <select
                  id="course-dropdown"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                  value={selectedCourse}
                  onChange={handleCourseChange}
                  disabled={!selectedEmployee}
                >
                  <option value="">--Select a course--</option>
                  {courses.map((course) => (
                    <option key={course.id} value={course.id}>
                      {course.title}
                    </option>
                  ))}
                </select>
              </div>
              {courseDetails && (
                <div className="mt-4">
                  <h2 className="font-bold text-xl text-center">
                    Course Details
                  </h2>
                  <p>
                    <strong>Course Name:</strong> {courseDetails.title}
                  </p>
                  <p>
                    <strong>Difficulty:</strong> {courseDetails.difficulty}
                  </p>
                  <p>
                    <strong>Total Time:</strong> {courseDetails.totalTime} mins
                  </p>
                  <p>
                    <strong>Total Modules:</strong> {courseDetails.totalModules}
                  </p>
                </div>
              )}
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="disabled:opacity-25 disabled:cursor-not-allowed inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                onClick={handleSave}
                disabled={!selectedEmployee || !selectedCourse}
              >
                Assign Course
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignCourseModal;
