import React, { useState, useEffect } from "react";
import Sidebar from "../common/Sidebar";
import AddUserSkillModel from "../models_filters/AddUserSkillModel";
import Cookies from "js-cookie";
import axios from "axios";

const SkillSet = () => {
  const token = Cookies.get("token");
  const [userSkillsData, setUserSkillsData] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchUserSkills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1200/api/users/skills`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setUserSkillsData(response.data);
      } catch (error) {
        console.error("Error fetching user skills:", error);
      }
    };

    fetchUserSkills();
  }, [token, showModal]);

  const handleAddSkill = async (newSkill) => {
    try {
      await axios.post("http://localhost:1200/api/users/add-skills", newSkill, {
        headers: {
          authorization: `${token}`,
        },
      });
      setUserSkillsData((prev) => [...prev, newSkill]);
      setShowModal(false);
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
    <div className="flex bg-mainbg h-screen">
      <Sidebar />
      <div className="ml-64 w-full h-screen overflow-y-auto flex flex-col">
        <h1 className="font-extrabold text-19xl py-8">Manage your skill set</h1>
        {showModal && (
          <AddUserSkillModel
            onClose={() => setShowModal(false)}
            onAddSkill={handleAddSkill}
          />
        )}
        <div className="flex justify-end mb-4 mr-10">
          <button
            onClick={() => setShowModal(true)}
            className="ml-2 flex px-4 py-2 bg-white items-center border border-primary-300 rounded-md text-center gap-2 transition duration-300 hover:text-white hover:bg-primary-200 shadow-md"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-plus-square"
              viewBox="0 0 16 16"
            >
              <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
            </svg>
            Add Skill
          </button>
        </div>

        <div className="mr-10 ml-4 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-primary-300">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Skills
                </th>
                <th scope="col" className="px-6 py-3">
                  Level
                </th>
              </tr>
            </thead>
            <tbody className="bg-bg">
              {userSkillsData.length > 0 ? (
                userSkillsData.map((userSkill, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-6 py-4 font-medium text-gray-900">
                      {userSkill.skill}
                    </td>
                    <td className="px-6 py-4">{userSkill.level}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="px-6 py-4 text-center">
                    No data
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SkillSet;
