import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddCourseModal = ({ onClose, onAddCourse }) => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [shortIntro, setShortIntro] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [language, setLanguage] = useState("");
  const [totalTime, setTotalTime] = useState(0);
  const [totalModules, setTotalModules] = useState(0);
  const [skills, setSkills] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState({});

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1200/api/skills-and-designations/skills"
        );
        const sortedSkills = response.data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
        setSkills(sortedSkills);
      } catch (error) {
        toast.error("Error fetching skills. Please try again later.");
      }
    };
    fetchSkills();
  }, []);

  const handleSave = async () => {
    if (
      !title ||
      !url ||
      !difficulty ||
      !totalTime ||
      !totalModules ||
      !language ||
      !shortIntro ||
      Object.keys(selectedSkills).length === 0
    ) {
      return toast.error("Please fill in all required fields.");
    }
    if (!isValidURL(url)) {
      return toast.error("Please enter a valid URL for the certificate.");
    }

    const body = {
      title,
      url,
      shortIntro,
      difficulty,
      language,
      totalTime,
      totalModules,
      skills: Object.entries(selectedSkills).map(([id, level]) => ({
        id,
        level,
      })),
    };
    onAddCourse(body);
  };

  const handleSkillChange = (skillId, level) => {
    setSelectedSkills((prev) => ({
      ...prev,
      [skillId]: level,
    }));
  };

  const handleClose = () => {
    onClose();
  };
  const isValidURL = (string) => {
    const urlPattern = new RegExp(
      "^(https?:\\/\\/)?" + // protocol
        "((([a-z\\d](?:(?:[a-z\\d-]*[a-z\\d])?)\\.)+[a-z]{2,})|" + // domain name
        "localhost|" + // localhost
        "\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}\\.\\d{1,3}|" + // IPv4
        "\\[?[a-fA-F0-9]*:[a-fA-F0-9:]+\\]?)" + // IPv6
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
        "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );
    return !!urlPattern.test(string);
  };

  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center sm:p-0">
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl md:px-5">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h1 className="text-center font-bold text-5xl mb-6">
                Add Course
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="course-title"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course Title
                </label>
                <input
                  id="course-title"
                  type="text"
                  className="mt-1 block w-full border px-3 p-2 border-gray-300 rounded-md shadow-sm"
                  value={title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="course-url"
                  className="block text-sm font-medium text-gray-700"
                >
                  Course URL
                </label>
                <input
                  id="course-url"
                  type="text"
                  required
                  className="mt-1 block w-full border px-3 p-2 border-gray-300 rounded-md shadow-sm"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="course-intro"
                  className="block text-sm font-medium text-gray-700"
                >
                  Short Introduction
                </label>
                <textarea
                  id="course-intro"
                  className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm"
                  value={shortIntro}
                  required
                  onChange={(e) => setShortIntro(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="course-difficulty"
                  className="block text-sm font-medium text-gray-700"
                >
                  Difficulty
                </label>
                <select
                  id="course-difficulty"
                  className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm"
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                >
                  <option value="">--Select Difficulty--</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="course-language"
                  className="block text-sm font-medium text-gray-700"
                >
                  Language
                </label>
                <input
                  id="course-language"
                  type="text"
                  className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm"
                  value={language}
                  required
                  onChange={(e) => setLanguage(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="total-time"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Time (mins)
                </label>
                <input
                  id="total-time"
                  type="number"
                  required
                  className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm"
                  value={totalTime}
                  onChange={(e) => setTotalTime(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="total-modules"
                  className="block text-sm font-medium text-gray-700"
                >
                  Total Modules
                </label>
                <input
                  id="total-modules"
                  type="number"
                  className="mt-1 block w-full border p-2 border-gray-300 rounded-md shadow-sm"
                  value={totalModules}
                  required
                  onChange={(e) => setTotalModules(e.target.value)}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="course-skills"
                  className="block text-sm font-medium text-gray-700"
                >
                  Skills
                </label>
                <div className="space-y-4 h-64 overflow-y-scroll">
                  {skills.map((skill) => (
                    <div key={skill.id} className="pl-5">
                      <h3 className="font-semibold text-lg mb-2">
                        {skill.name}
                      </h3>
                      <div className="grid grid-cols-3 gap-4">
                        {["Beginner", "Intermediate", "Advanced"].map(
                          (level) => (
                            <div
                              key={`${skill.id}-${level}`}
                              className="flex items-center"
                            >
                              <input
                                type="radio"
                                id={`${skill.id}-${level}`}
                                name={`skill-${skill.id}`}
                                value={`${skill.id}-${level}`}
                                checked={selectedSkills[skill.id] === level}
                                onChange={() =>
                                  handleSkillChange(skill.id, level)
                                }
                                className="mr-2"
                              />
                              <label
                                htmlFor={`${skill.id}-${level}`}
                                className="text-sm"
                              >
                                {level.charAt(0).toUpperCase() + level.slice(1)}
                              </label>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
              <button
                type="button"
                className="disabled:opacity-25 disabled:cursor-not-allowed inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                onClick={handleSave}
                disabled={
                  !title ||
                  !url ||
                  !difficulty ||
                  !totalTime ||
                  !totalModules ||
                  !language ||
                  Object.keys(selectedSkills).length === 0
                }
              >
                Add Course
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

export default AddCourseModal;
