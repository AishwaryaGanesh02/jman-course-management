import React from "react";

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
  const resetFilters = () => {
    setSelectedSkills([]);
    setSelectedLanguages([]);
    setSelectedDifficulties([]);
  };

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
        <div className="flex flex-col space-y-2">
          {skills.map((skill) => (
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
          ))}
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
