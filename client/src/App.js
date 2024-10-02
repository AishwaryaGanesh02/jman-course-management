import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ProtectRoute from "./components/ProtectRoutes";
import SkillSet from "./components/SkillSet";
import EmployeeCourseList from "./components/EmployeeCourseList";
import CourseDetail from "./components/CourseDetail";
import AllCourses from "./components/AllCourses";

function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/updateSkills"
            element={<ProtectRoute element={<SkillSet />} />}
          />
          <Route
            path="/updateCourses"
            element={<ProtectRoute element={<EmployeeCourseList />} />}
          />
          <Route
            path="/courseInfo/:courseId"
            element={<ProtectRoute element={<CourseDetail />} />}
          />
          <Route
            path="/allCourses"
            element={<ProtectRoute element={<AllCourses />} />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
