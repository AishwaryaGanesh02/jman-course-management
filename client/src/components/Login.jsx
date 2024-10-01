import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

export default function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const onChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = user;
      const body = { email, password };
      const response = await axios.post(
        "http://localhost:1200/api/auth/login",
        body,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const parseRes = response.data;
      if (parseRes.token) {
        Cookies.set("token", parseRes.token, { expires: 1 });
        Cookies.set("userid", parseRes.userid);
        Cookies.set("role", parseRes.role);
        Cookies.set("degnid", parseRes.degnid);
        alert("Successfully Logged in");
        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      } else {
        alert("Invalid password or Invalid Email");
        navigate("/");
      }
    } catch (err) {
      console.error(err.message);
      alert("Login failed. Please try again.");
    }
  };

  const { email, password } = user;

  return (
    <div className="bg-textbg min-h-screen flex items-center justify-center">
      <div className="flex flex-col m-6 space-y-8 bg-white shadow-2xl rounded-2xl">
        <div className="p-12">
          <h1 className="text-5xl text-center font-bold">Login</h1>
          <form className="mt-4 space-y-4" onSubmit={onSubmitForm}>
            <div>
              <label className="text-md">Email</label>
              <input
                type="text"
                className="block w-full mt-1.5 rounded-md border-0 pl-2 bg-textbg text-gray-900 shadow-sm ring-1 ring-gray-300"
                name="email"
                value={email}
                onChange={onChange}
                required
              />
            </div>
            <div>
              <label className="text-md">Password</label>
              <input
                type="password"
                name="password"
                className="block w-full mt-1.5 rounded-md border-0 pl-2 bg-textbg text-gray-900 shadow-sm ring-1 ring-gray-300"
                value={password}
                onChange={onChange}
                required
              />
            </div>
            <button className="w-full bg-primary-100 text-white py-2 rounded-lg">
              Sign in
            </button>
          </form>
          <div className="text-center mt-4">
            Don't have an account?{" "}
            <Link to="/SignUp" className="font-bold">
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
