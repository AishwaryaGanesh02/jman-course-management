import React, { useState } from "react";

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
  const [search, setSearch] = useState("");

  const filteredEmployees = search
    ? usernames.filter((name) =>
        name.toLowerCase().includes(search.toLowerCase())
      )
    : usernames;

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
    <div className="flex flex-col space-y-4 mb-4 p-4 bg-white rounded shadow-md h-screen">
      <div>
        <h3 className="font-bold text-lg">Designations</h3>
        <div className="flex flex-col space-y-2 h-48 overflow-y-scroll">
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
        <h3 className="font-bold text-lg mt-2 ">Employee Names</h3>
        <div className="my-3 flex items-center gap-2 border rounded p-1 w-full bg-white shadow-md">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="#9ca3af"
            className="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
          <input
            type="text"
            placeholder="Search employees..."
            className="w-full bg-white focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-col space-y-2 h-60 overflow-y-scroll">
          {filteredEmployees.length > 0 ? (
            filteredEmployees.map((username) => (
              <label key={username} className="flex items-center">
                <input
                  type="checkbox"
                  checked={selectedUsername.includes(username)}
                  onChange={() => handleUsernameChange(username)}
                  className="mr-2"
                />
                {username.charAt(0).toUpperCase() + username.slice(1)}
              </label>
            ))
          ) : (
            <p className="text-gray-500">No employees found.</p>
          )}
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
