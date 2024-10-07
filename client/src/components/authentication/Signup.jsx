import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import bg_logo from "../assets/bg_logo.jpg";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [degn, setDegn] = useState("");
  const [gender, setGender] = useState("Others");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [designations, setDesignations] = useState([]);
  const [passwordStrength, setPasswordStrength] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1200/api/skills-and-designations/designations"
        );
        setDesignations(response.data);
      } catch (error) {
        toast.error("Error fetching designations. Please try again later.");
      }
    };

    fetchDesignations();
  }, []);

  const handleChange = (e) => {
    setPassword(e.target.value);
    setPasswordStrength(getPasswordStrength(e.target.value));
  };

  const getPasswordStrength = (password) => {
    const hasCapitalLetter = /[A-Z]/.test(password);
    const hasSmallLetter = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    const hasMinimumLength = password.length >= 8;

    if (password.length === 0) {
      return "Please enter a password";
    }
    if (password.length === 1) {
      return "Very Weak";
    }
    if (
      hasCapitalLetter &&
      hasSmallLetter &&
      hasSpecialCharacter &&
      hasNumber &&
      hasMinimumLength
    ) {
      return "Very Strong";
    }
    if (hasCapitalLetter && hasSmallLetter && hasMinimumLength && hasNumber) {
      return "Strong";
    }
    if ((hasCapitalLetter || hasSmallLetter) && hasMinimumLength) {
      return "Medium";
    }
    return "Weak";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.endsWith("@shcrew.com")) {
      toast.error("Please use your official email.");
      return;
    }

    if (password !== repassword) {
      toast.error("Passwords do not match. Please try again.");
      return;
    }
    try {
      const body = {
        username: name,
        email,
        designationId: degn,
        gender,
        password,
        phoneNumber,
      };
      const response = await axios.post(
        "http://localhost:1200/api/auth/register",
        body
      );
      toast.success(response.data.message);

      if (response.data.message === "Successfully Registered") {
        setTimeout(() => {
          navigate("/");
        }, 500);
      }
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }

    setName("");
    setEmail("");
    setDegn("");
    setPassword("");
    setRePassword("");
    setGender("");
    setPhoneNumber("");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bg_logo})`,
      }}
      className="bg-textbg min-h-screen flex items-center justify-center bg-no-repeat"
    >
      <ToastContainer />
      <div className="flex items-center justify-center min-h-screen bg-grey-100">
        <div className="relative flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl md:flex-row md:space-y-0">
          <div className="flex flex-col justify-center md:px-14 md:py-8 p-10">
            <span className="mb-2 text-5xl text-center font-bold">Sign Up</span>
            <form onSubmit={handleSubmit}>
              <div className="mt-3">
                <span className="mb-2 text-md">Name</span>
                <input
                  type="text"
                  className="block w-full mt-1.5 rounded-md box-border border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset bg-textbg ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="name"
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="mt-3">
                <span className="mb-2 text-md">Email</span>
                <input
                  type="email"
                  className="block w-full mt-1.5 rounded-md box-border border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset bg-textbg ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mt-3">
                <span className="mb-2 text-md">Phone</span>
                <input
                  type="number"
                  className="block w-full mt-1.5 rounded-md box-border border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset bg-textbg ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="phone"
                  id="phone"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                />
              </div>
              <div className="mt-3">
                <span className="mb-2 text-md">Designation</span>
                <select
                  className="block w-full mt-1.5 rounded-md box-border border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset bg-textbg ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="degn"
                  id="degn"
                  value={degn}
                  onChange={(e) => setDegn(e.target.value)}
                  required
                >
                  <option value="">Select Designation</option>
                  {designations.map((designation) => (
                    <option key={designation.id} value={designation.id}>
                      {designation.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mt-3">
                <span className="mb-2 rext-md">Gender</span>
                <div className="flex items-center">
                  <label className="inline-flex items-center mt-1.5">
                    <input
                      type="radio"
                      name="gender"
                      value="Male"
                      checked={gender === "Male"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out box-border border-0 shadow-sm ring-1 ring-inset  bg-textbg ring-gray-300"
                    />
                    <span className="ml-2">Male</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="gender"
                      value="Female"
                      checked={gender === "Female"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out box-border border-0 shadow-sm ring-1 ring-inset bg-textbg ring-gray-300"
                    />
                    <span className="ml-2">Female</span>
                  </label>
                  <label className="inline-flex items-center ml-6">
                    <input
                      type="radio"
                      name="gender"
                      value="Others"
                      checked={gender === "Others"}
                      onChange={(e) => setGender(e.target.value)}
                      className="form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out box-border border-0 shadow-sm ring-1 ring-inset  bg-textbg ring-gray-300"
                    />
                    <span className="ml-2">Others</span>
                  </label>
                </div>
              </div>
              <div className="mt-3">
                <span className="mb-2 text-md">Password</span>
                <input
                  type="password"
                  value={password}
                  onChange={handleChange}
                  className="block w-full mt-1.5 rounded-md box-border border-0 px-0 text-gray-900 shadow-sm ring-1 ring-inset bg-textbg ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-2 pr-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                />
                <div className="mt-2 flex justify-between">
                  <div className="flex-1 mr-2">
                    <div
                      className={`h-2 rounded ${
                        passwordStrength === "Very Weak"
                          ? "bg-red-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 mr-2">
                    <div
                      className={`h-2 rounded ${
                        passwordStrength === "Weak"
                          ? "bg-orange-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 mr-2">
                    <div
                      className={`h-2 rounded ${
                        passwordStrength === "Medium"
                          ? "bg-yellow-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1 mr-2">
                    <div
                      className={`h-2 rounded ${
                        passwordStrength === "Strong"
                          ? "bg-green-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <div className="flex-1">
                    <div
                      className={`h-2 rounded ${
                        passwordStrength === "Very Strong"
                          ? "bg-blue-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <span className="mb-2 text-md">Confirm Password</span>
                <input
                  type="password"
                  className="block w-full mt-1.5 rounded-md box-border border-0 px-0 text-gray-900 shadow-sm bg-textbg ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 pl-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  name="repassword"
                  id="repassword"
                  value={repassword}
                  onChange={(e) => setRePassword(e.target.value)}
                  required
                />
              </div>
              <button className="w-full lg:w-auto bg-primary-100 text-white px-40 py-2 rounded-lg mb-2 hover:border-gray-300 mt-4">
                Sign Up
              </button>
            </form>
            <div className="text-center text-grey-400">
              Do you have an account?
              <Link to="/" className="font-bold">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
