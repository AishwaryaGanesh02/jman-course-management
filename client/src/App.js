import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import ProtectRoute from "./components/authentication/ProtectRoutes";
import Login from "./components/authentication/Login";
import SignUp from "./components/authentication/Signup";

import SkillSet from "./components/pages/SkillSet";
import EmployeeCourseList from "./components/pages/EmployeeCourseList";
import CourseDetail from "./components/pages/CourseDetail";
import AllCourses from "./components/pages/AllCourses";
import Dashboard from "./components/pages/Dashboard";
import NotFound from "./components/common/NotFound";
import Profile from "./components/pages/Profile";

function App() {
  return (
    <div className="h-screen">
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

          <Route
            path="/dashboard"
            element={
              <ProtectRoute element={<Dashboard />} allowedRoles={["admin"]} />
            }
          />
          <Route
            path="/profile"
            element={<ProtectRoute element={<Profile />} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
