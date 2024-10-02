import React from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const userRole = Cookies.get("role");

  const adminLinks = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "All Courses", path: "/allcourses" },
    { name: "Manage Employee Courses", path: "/updateCourses" },
  ];

  const employeeLinks = [
    { name: "My Courses", path: "/allcourses" },
    { name: "Skill Development", path: "/updateSkills" },
  ];

  const links = userRole === "admin" ? adminLinks : employeeLinks;

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userid");
    Cookies.remove("degnid");
    alert("Successfully logged out");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  return (
    <aside className="fixed top-0 h-full w-56 bg-primary-100 text-white flex flex-col">
      <div className="flex-shrink-0 p-4 bg-primary-200">
        <div className="flex items-center justify-center my-3 gap-3">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="45"
            height="45"
            fill="currentColor"
            class="bi bi-mortarboard-fill"
            viewBox="0 0 16 16"
          >
            <path d="M8.211 2.047a.5.5 0 0 0-.422 0l-7.5 3.5a.5.5 0 0 0 .025.917l7.5 3a.5.5 0 0 0 .372 0L14 7.14V13a1 1 0 0 0-1 1v2h3v-2a1 1 0 0 0-1-1V6.739l.686-.275a.5.5 0 0 0 .025-.917z" />
            <path d="M4.176 9.032a.5.5 0 0 0-.656.327l-.5 1.7a.5.5 0 0 0 .294.605l4.5 1.8a.5.5 0 0 0 .372 0l4.5-1.8a.5.5 0 0 0 .294-.605l-.5-1.7a.5.5 0 0 0-.656-.327L8 10.466z" />
          </svg>
          <h1 className="font-bold text-5xl">Course Navigator</h1>
        </div>
      </div>

      <div className="flex-grow p-4 text-3xl leading-10">
        <ul className="nav nav-pills flex-column mb-auto text-white">
          {links.map((link, index) => (
            <li key={index} className="nav-item">
              <a
                href={link.path}
                className="nav-link text-white hover:bg-primary-300"
              >
                {link.name}
              </a>
            </li>
          ))}
          <li className="nav-item">
            <a
              onClick={logout}
              className="nav-link text-white hover:bg-primary-300"
            >
              Logout
            </a>
          </li>
        </ul>
      </div>

      <div className="flex-shrink-0 p-4 bg-primary-200 mt-auto flex items-center">
        <a href="/profile" className="text-white font-semibold text-lg">
          View Profile
        </a>
      </div>
    </aside>
  );
};

export default Sidebar;
