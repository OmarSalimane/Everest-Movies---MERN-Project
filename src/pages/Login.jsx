import React, { useContext, useEffect, useState } from "react";
import { WatchContext } from "../context/WatchContext";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";

const Login = () => {
  const [currentState, setCurrentState] = useState("Sign Up");
  const { token, setToken } = useContext(WatchContext);

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (currentState === "Sign Up") {
        const response = await axios.post(
          "http://localhost:4000/api/user/register",
          {
            name,
            email,
            password,
          }
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      } else {
        const response = await axios.post(
          "http://localhost:4000/api/user/login",
          { email, password }
        );
        if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem("token", response.data.token);
          navigate("/");
        } else {
          toast.error(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  // Check if the user is already logged in when first loading this page
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    // Only redirect if we have a token AND we're not explicitly trying to access login page
    if (
      storedToken &&
      location.pathname === "/login" &&
      !location.state?.forceLogin
    ) {
      navigate("/");
    }
  }, []);

  const handleStateChange = (newState) => {
    setCurrentState(newState);
    // Clear fields when switching between Login and Sign Up
    setName("");
    setPassword("");
    setEmail("");
  };

  // Add logout functionality
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    // Force the login page to show even if we came from a redirect
    navigate("/login", { state: { forceLogin: true } });
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-blue-600"
    >
      <div className="inline-flex items-center gap-2 mb-2 mt-10">
        <p className="prata-regular text-3xl">{currentState}</p>
        <hr className="border-none h-[1.5px] w-8 bg-white" />
      </div>
      {currentState === "Login" ? (
        ""
      ) : (
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          type="text"
          className="w-full px-3 py-2 border border-blue-800"
          required
          placeholder="Name"
        />
      )}
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        className="w-full px-3 py-2 border border-blue-800"
        required
        placeholder="Email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="password"
        className="w-full px-3 py-2 border border-blue-800"
        required
        placeholder="Password"
      />
      <div className="w-full flex justify-between text-sm mt-[-8px]">
        <p className="cursor-pointer">Forgot your password?</p>
        {currentState === "Login" ? (
          <p
            onClick={() => handleStateChange("Sign Up")}
            className="cursor-pointer"
          >
            Create an account
          </p>
        ) : (
          <p
            onClick={() => handleStateChange("Login")}
            className="cursor-pointer"
          >
            Login here
          </p>
        )}
      </div>
      <button className="bg-blue-700 text-white font-light px-8 py-2 mt-4">
        {currentState === "Login" ? "Sign In" : "Sign Up"}
      </button>

      {token && (
        <button
          type="button"
          onClick={handleLogout}
          className="bg-gray-700 text-white font-light px-8 py-2 mt-2"
        >
          Logout
        </button>
      )}
    </form>
  );
};

export default Login;
