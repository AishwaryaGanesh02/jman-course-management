import React, { useState } from "react";

const CourseFilters = ({
  skills,
  selectedSkills,
  setSelectedSkills,
  languages,
  selectedLanguages,
  setSelectedLanguages,
  difficultyLevels,
  selectedDifficulties,
  setSelectedDifficulties,
}) => {
  const [search, setSearch] = useState("");

  const resetFilters = () => {
    setSelectedSkills([]);
    setSelectedLanguages([]);
    setSelectedDifficulties([]);
    setSearch("");
  };

  // Filtering skills based on search input
  const filteredSkills = search
    ? skills.filter((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      )
    : skills;

  return (
    <div className="flex flex-col space-y-4 mb-4 p-4 bg-white rounded shadow-md">
      <div>
        <h3 className="font-bold text-lg">Difficulty Levels</h3>
        <div className="flex flex-col space-y-2">
          {difficultyLevels.map((level) => (
            <label key={level} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedDifficulties.includes(level)}
                onChange={() => {
                  if (selectedDifficulties.includes(level)) {
                    setSelectedDifficulties(
                      selectedDifficulties.filter((d) => d !== level)
                    );
                  } else {
                    setSelectedDifficulties([...selectedDifficulties, level]);
                  }
                }}
                className="mr-2"
              />
              {level}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">Languages</h3>
        <div className="flex flex-col space-y-2">
          {languages.map((lang) => (
            <label key={lang} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedLanguages.includes(lang)}
                onChange={() => {
                  if (selectedLanguages.includes(lang)) {
                    setSelectedLanguages(
                      selectedLanguages.filter((l) => l !== lang)
                    );
                  } else {
                    setSelectedLanguages([...selectedLanguages, lang]);
                  }
                }}
                className="mr-2"
              />
              {lang}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">Skills</h3>
        <div className="mb-4 flex items-center gap-2 border rounded p-2 w-full bg-white shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="#9ca3af"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            placeholder="Search skills..."
            className="w-full bg-white focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2">
          {filteredSkills.length > 0 ? (
            filteredSkills.map((skill) => (
              <label key={skill} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedSkills.includes(skill)}
                  onChange={() => {
                    if (selectedSkills.includes(skill)) {
                      setSelectedSkills(
                        selectedSkills.filter((s) => s !== skill)
                      );
                    } else {
                      setSelectedSkills([...selectedSkills, skill]);
                    }
                  }}
                  className="mr-2"
                />
                {skill}
              </label>
            ))
          ) : (
            <p className="text-gray-500">No skills found.</p>
          )}
        </div>
      </div>

      <button
        onClick={resetFilters}
        className="mt-4 bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
      >
        Reset
      </button>
    </div>
  );
};

export default CourseFilters;
