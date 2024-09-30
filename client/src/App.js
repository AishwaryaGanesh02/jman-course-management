import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="flex flex-col h-screen justify-between">
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/manageSkills" element={<ManageSkills />} />
          <Route path="/updateSkills" element={<UpdateSkillSet />} /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
