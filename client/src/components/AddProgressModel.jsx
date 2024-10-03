import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AddProgressModal = ({
  onClose,
  onAddProgress,
  totalModules,
  completedModules,
}) => {
  const [modulesCompleted, setModulesCompleted] = useState(0);
  const [certificateURL, setCertificateURL] = useState("");

  const handleModulesChange = (event) => {
    setModulesCompleted(Number(event.target.value));
  };

  const handleURLChange = (event) => {
    setCertificateURL(event.target.value);
  };

  const handleSave = async () => {
    if (modulesCompleted < 0 || modulesCompleted > totalModules) {
      return alert("Modules completed must be between 0 and total modules.");
    }

    const progressStatus =
      modulesCompleted === totalModules ? "completed" : "in_progress";
    const newProgress = {
      modulesCompleted,
      progressStatus,
      certificateProof:
        modulesCompleted === totalModules ? certificateURL : null,
      lastUpdated: new Date().toISOString(),
    };

    onAddProgress(newProgress);
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
          <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <h1 className="text-center font-bold text-5xl">
                Update Progress
              </h1>
              <div className="mb-4">
                <label
                  htmlFor="modules-completed"
                  className="block text-sm font-medium text-gray-700"
                >
                  Completed Modules
                </label>
                <div className="flex items-center mt-1">
                  <input
                    id="modules-completed"
                    type="number"
                    className="block "
                    value={
                      modulesCompleted === 0
                        ? completedModules
                        : modulesCompleted
                    }
                    onChange={handleModulesChange}
                    min={completedModules}
                    max={totalModules}
                  />
                  <span className="ml-2 text-gray-600">of {totalModules}</span>
                </div>
              </div>
              {modulesCompleted === totalModules && (
                <div>
                  <b>Successfully competed the course!! </b>{" "}
                  <p>Upload you certificate link</p>
                  <label
                    htmlFor="certificate-url"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Certificate URL
                  </label>
                  <input
                    id="certificate-url"
                    type="text"
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                    value={certificateURL}
                    onChange={handleURLChange}
                  />
                </div>
              )}
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 sm:align-items-center">
              <button
                type="submit"
                className="disabled:opacity-25 disabled:cursor-not-allowed inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm cursor-pointer sm:ml-3 sm:w-auto"
                onClick={handleSave}
                disabled={
                  modulesCompleted < 0 ||
                  (modulesCompleted === totalModules && !certificateURL)
                }
              >
                Save
              </button>
              <button
                type="button"
                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                onClick={onClose}
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

export default AddProgressModal;
