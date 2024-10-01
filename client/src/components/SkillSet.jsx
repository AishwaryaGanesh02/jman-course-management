import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AddUserSkillModel from "./AddUserSkillModel";
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
    <div className="flex">
      <Sidebar />
      <div className="m-3 sm:ml-42 md:ml-60">
        <h1 className="font-extrabold text-2xl text-center">
          Manage your skill set
        </h1>
        {showModal && (
          <AddUserSkillModel
            onClose={() => setShowModal(false)}
            onAddSkill={handleAddSkill}
          />
        )}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-blue-700 transition duration-300"
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

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Skills
                </th>
                <th scope="col" className="px-6 py-3">
                  Level
                </th>
              </tr>
            </thead>
            <tbody>
              {userSkillsData.length > 0 ? (
                userSkillsData.map((userSkill, index) => (
                  <tr
                    key={index}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {userSkill.skill}
                    </td>
                    <td className="px-6 py-4">{userSkill.level}</td>{" "}
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
