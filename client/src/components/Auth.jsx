import React, { useState } from "react";
import authService from "../services/authService";

const Auth = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await authService.login(username, password);
        alert(`Logged in: ${response.data.token}`);
      } else {
        await authService.register(username, password);
        alert("Registration successful!");
      }
    } catch (error) {
      alert(error.response?.data?.message || "An error occurred");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{isLogin ? "Login" : "Register"}</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">{isLogin ? "Login" : "Register"}</button>
      <button type="button" onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? "Register" : "Login"}
      </button>
    </form>
  );
};

export default Auth;
