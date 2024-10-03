import React from "react";

const ProgressFilter = ({
  designations,
  selectedDesignation,
  setSelectedDesignation,
  statuses,
  selectedStatus,
  setSelectedStatus,
  usernames,
  selectedUsername,
  setSelectedUsername,
  difficultyLevels,
  selectedDifficulties,
  setSelectedDifficulties,
}) => {
  const handleDesignationChange = (designation) => {
    if (selectedDesignation.includes(designation)) {
      setSelectedDesignation(
        selectedDesignation.filter((d) => d !== designation)
      );
    } else {
      setSelectedDesignation([...selectedDesignation, designation]);
    }
  };

  const handleStatusChange = (status) => {
    if (selectedStatus.includes(status)) {
      setSelectedStatus(selectedStatus.filter((s) => s !== status));
    } else {
      setSelectedStatus([...selectedStatus, status]);
    }
  };

  const handleUsernameChange = (username) => {
    if (selectedUsername.includes(username)) {
      setSelectedUsername(selectedUsername.filter((u) => u !== username));
    } else {
      setSelectedUsername([...selectedUsername, username]);
    }
  };

  const handleDifficultyChange = (difficulty) => {
    if (selectedDifficulties.includes(difficulty)) {
      setSelectedDifficulties(
        selectedDifficulties.filter((d) => d !== difficulty)
      );
    } else {
      setSelectedDifficulties([...selectedDifficulties, difficulty]);
    }
  };

  const resetFilters = () => {
    setSelectedDesignation([]);
    setSelectedStatus([]);
    setSelectedUsername([]);
    setSelectedDifficulties([]);
  };

  return (
    <div className="flex flex-col space-y-4 mb-4 p-4 bg-white rounded shadow-md">
      <div>
        <h3 className="font-bold text-lg">Designations</h3>
        <div className="flex flex-col space-y-2">
          {designations.map((designation) => (
            <label key={designation} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedDesignation.includes(designation)}
                onChange={() => handleDesignationChange(designation)}
                className="mr-2"
              />
              {designation}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">Completion Status</h3>
        <div className="flex flex-col space-y-2">
          {statuses.map((status) => (
            <label key={status} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedStatus.includes(status)}
                onChange={() => handleStatusChange(status)}
                className="mr-2"
              />
              {status
                .replace(/_/g, " ")
                .split(" ")
                .map(
                  (word) =>
                    word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
                )
                .join(" ")}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">Employee Names</h3>
        <div className="flex flex-col space-y-2">
          {usernames.map((username) => (
            <label key={username} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedUsername.includes(username)}
                onChange={() => handleUsernameChange(username)}
                className="mr-2"
              />
              {username.charAt(0).toUpperCase() + username.slice(1)}
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-bold text-lg">Difficulty Levels</h3>
        <div className="flex flex-col space-y-2">
          {difficultyLevels.map((difficulty) => (
            <label key={difficulty} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedDifficulties.includes(difficulty)}
                onChange={() => handleDifficultyChange(difficulty)}
                className="mr-2"
              />
              {difficulty}
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

export default ProgressFilter;
