import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddSkillModal = ({ onClose, onAddSkill }) => {
  const [allSkills, setAllSkills] = useState([]);
  const [selectedSkill, setSelectedSkill] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("Beginner");
  const token = Cookies.get("token");

  useEffect(() => {
    const fetchAllSkills = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1200/api/users/other-skills`,
          {
            headers: {
              authorization: `${token}`,
            },
          }
        );
        setAllSkills(response.data);
      } catch (error) {
        console.error("Error fetching skills:", error);
      }
    };

    fetchAllSkills();
  }, []);

  const handleSkillChange = (event) => {
    setSelectedSkill(event.target.value);
  };

  const handleLevelChange = (event) => {
    setSelectedLevel(event.target.value);
  };

  const handleSave = async () => {
    if (!selectedSkill) {
      return toast.error("Select a skill");
    }

    const body = {
      skillId: selectedSkill,
      level: selectedLevel,
    };
    onAddSkill(body);
    toast.success("Skill added successfully!");
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
              <h1 className="text-center font-bold text-5xl">
                Add your skills
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="skill-dropdown"
                  className="block text-sm font-medium text-gray-700"
                >
                  Select Skill
                </label>
                {allSkills.length > 0 ? (
                  <select
                    id="skill-dropdown"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={selectedSkill}
                    onChange={handleSkillChange}
                  >
                    <option value="">--Select a skill--</option>
                    {allSkills.map((skill) => (
                      <option key={skill.id} value={skill.id}>
                        {skill.name}
                      </option>
                    ))}
                  </select>
                ) : (
                  <h1 className="text-red">No skills available</h1>
                )}
              </div>
              <div>
                <span className="block text-sm font-medium text-gray-700">
                  Skill Level
                </span>
                <div className="mt-2 space-y-2">
                  {["Beginner", "Intermediate", "Advanced"].map((level) => (
                    <div key={level} className="flex items-center">
                      <input
                        type="radio"
                        id={`level-${level}`}
                        name="skill-level"
                        value={level}
                        checked={selectedLevel === level}
                        onChange={handleLevelChange}
                        className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`level-${level}`}
                        className="ml-3 block text-sm font-medium text-gray-700"
                      >
                        {level}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 sm:align-items-center">
              <button
                type="submit"
                className="disabled:opacity-25 disabled:cursor-not-allowed inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer sm:ml-3 sm:w-auto"
                onClick={handleSave}
                disabled={!selectedSkill}
              >
                Save
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

export default AddSkillModal;
