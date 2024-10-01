import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./components/Auth";
import Login from "./components/Login";
import SignUp from "./components/Signup";
import ProtectRoute from "./components/ProtectRoutes";
import SkillSet from "./components/SkillSet";
import CourseList from "./components/CourseList";
import CourseDetail from "./components/CourseDetail";

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
            element={<ProtectRoute element={<CourseList />} />}
          />
          <Route
            path="/courseInfo"
            element={<ProtectRoute element={<CourseDetail />} />}
          />
          {/* <Route path="/profile" element={<UserProfile />} />
          <Route path="/manageSkills" element={<ManageSkills />} />
          <Route path="/updateSkills" element={<UpdateSkillSet />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
