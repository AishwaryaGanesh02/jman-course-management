import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import femaleAvatar from "./assets/Female-Avatar.png";
import maleAvatar from "./assets/male-avatar.png";
import avatar from "./assets/avatar.png";
import Sidebar from "./Sidebar";

function Profile() {
  const token = Cookies.get("token");

  const userId = Cookies.get("userid");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designation, setDesignation] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const editCSS = "ring-1 ring-gray-300 focus:ring-gray-300";

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axios.get(
          `http://localhost:1200/api/users/userInfo`,
          { headers: { authorization: `${token}` } }
        );
        const user = response.data.data;
        setName(user.name);
        setGender(user.gender);
        setEmail(user.email);
        setDesignation(user.designation);
        setPhoneNumber(user.phoneNumber);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserInfo();
  }, []);

  const handleSave = async () => {
    if (isEditMode) {
      try {
        await axios.put(`http://localhost:1200/api/user/edit/${userId}`, {
          name,
          gender,
        });
        alert("Profile Updated!");
        setIsEditMode(false);
      } catch (error) {
        console.error("Error updating profile:", error);
      }
    }
  };

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-3 xs:ml-40 sm:ml-40 md:ml-56 flex-1">
        <div className="relative">
          <div className="bg-primary-300 px-10 pt-24 pb-6 h-[30vh]">
            <span className="font-extrabold text-21xl text-center">
              Hello, {name}
            </span>
          </div>

          <div className="z-50 relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
            <div className="w-[200px] h-[200px] relative">
              {gender === "Male" && (
                <img
                  src={maleAvatar}
                  alt="Male"
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />
              )}
              {gender === "Female" && (
                <img
                  src={femaleAvatar}
                  alt="Female"
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />
              )}
              {gender === "Others" && (
                <img
                  src={avatar}
                  alt="Other"
                  className="absolute inset-0 w-full h-full object-cover rounded-full"
                />
              )}
            </div>
          </div>

          <div className="relative top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="border-solid rounded-lg border-gray border-2 mx-[15%]">
              <div className="flex justify-end m-4">
                <button
                  className="w-24 h-10 bg-white border border-primary-300 rounded-md text-center gap-2 transition duration-300 hover:text-white hover:bg-primary-200 shadow-lg"
                  onClick={() => {
                    setIsEditMode(!isEditMode);
                    handleSave();
                  }}
                >
                  {isEditMode ? "Save" : "Edit Profile"}
                </button>
              </div>

              <div className="profile-details w-[65%] mx-auto mb-5">
                <div className="bg-white p-4">
                  <div className="mt-5 flex items-center">
                    <label className="w-32">Name:</label>
                    <input
                      type="text"
                      className={`text-black ml-4 w-full rounded-lg border-0 bg-gray-200 px-2 ${
                        isEditMode ? editCSS : ""
                      }`}
                      value={name}
                      onChange={(e) => handleInputChange(e, setName)}
                      disabled={!isEditMode}
                    />
                  </div>
                  <div className="mt-5 flex items-center">
                    <label className="w-32">Designation:</label>
                    <input
                      type="text"
                      className={`text-black ml-4 w-full rounded-lg border-0  bg-gray-200 px-2 ${
                        isEditMode ? "text-gray-500" : ""
                      }`}
                      value={designation}
                      disabled
                    />
                  </div>
                  <div className="mt-5 flex items-center">
                    <label className="w-32">Email:</label>
                    <input
                      type="text"
                      className={`text-black ml-4 w-full rounded-lg border-0  bg-gray-200 px-2 ${
                        isEditMode ? "text-gray-500" : ""
                      }`}
                      value={email}
                      disabled
                    />
                  </div>
                  <div className="mt-5 mb-2 flex items-center">
                    <label className="w-32">Gender:</label>
                    {isEditMode ? (
                      <div
                        className={`text-black ml-4 w-full rounded-lg border-0  bg-gray-200 px-2 ${
                          isEditMode ? editCSS : ""
                        }`}
                      >
                        <input
                          type="checkbox"
                          id="male"
                          value="Male"
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out bg-gray-200"
                          checked={gender === "Male"}
                          onChange={(e) => handleInputChange(e, setGender)}
                          disabled={!isEditMode}
                        />
                        <label htmlFor="male" className="ml-1 mr-3">
                          Male
                        </label>

                        <input
                          type="checkbox"
                          id="female"
                          value="Female"
                          checked={gender === "Female"}
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out bg-gray-200"
                          onChange={(e) => handleInputChange(e, setGender)}
                          disabled={!isEditMode}
                        />
                        <label htmlFor="female" className="ml-1 mr-3 px-2">
                          Female
                        </label>

                        <input
                          type="checkbox"
                          id="others"
                          value="Others"
                          checked={gender === "Others"}
                          className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out bg-gray-200"
                          onChange={(e) => handleInputChange(e, setGender)}
                          disabled={!isEditMode}
                        />
                        <label htmlFor="others" className="ml-1">
                          Others
                        </label>
                      </div>
                    ) : (
                      <p className="text-black ml-4 w-full rounded-lg border-0 bg-gray-200 px-2">
                        {gender}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
