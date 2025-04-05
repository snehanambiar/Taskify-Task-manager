import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store/auth";

const Login = () => {
  const [Data, setData] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }
  const dispatch = useDispatch();
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!Data.username || !Data.password) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/log-in",
        Data
      );

      console.log("API Response:", response.data); // Debugging

      alert(response.data.message || "Login successful!");
      localStorage.setItem("token", response.data.token); // Save token
      setData({ username: "", password: "" });
      // console.log(response);
      localStorage.setItem("id", response.data.id);
      localStorage.setItem("token", response.data.token);
      dispatch(authActions.login());
      navigate("/");
    } catch (error) {
      console.error("Login Error:", error); // Log full error
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      alert(errorMessage);
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl">Login</div>
        <input
          type="text"
          placeholder="Username"
          className="bg-gray-800 px-3 py-3 my-3 border w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />

        <input
          type="password"
          placeholder="Password"
          className="bg-gray-800 px-3 py-3 my-3 border w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />

        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-500 font-semibold text-white px-4 py-2 rounded-sm"
            onClick={submit}
          >
            Login
          </button>
          <Link to="/signup" className="text-gray-400 hover:text-gray-200">
            Not having an account? Click here to sign up.
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
