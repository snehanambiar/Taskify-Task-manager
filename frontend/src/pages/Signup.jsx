import { useState, React } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  if (isLoggedIn === true) {
    navigate("/");
  }

  const [Data, setData] = useState({ username: "", email: "", password: "" });
  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (!Data.username || !Data.password || !Data.email) {
        alert("All fields are required");
        return;
      }

      const response = await axios.post(
        "http://localhost:1000/api/v1/sign-in",
        Data
      );

      setData({ username: "", email: "", password: "" });
      alert(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Signup Error:", error); // Log full error for debugging

      // Check if response exists and extract error message
      const errorMessage =
        error.response?.data?.message || "Something went wrong!";
      alert(errorMessage); // Show error message
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center">
      <div className="p-4 w-2/6 rounded bg-gray-800">
        <div className="text-2xl">Signup</div>
        <input
          type="username"
          placeholder="username"
          className="bg-gray-800  px-3 py-3 my-3 border w-full rounded"
          name="username"
          value={Data.username}
          onChange={change}
        />
        <input
          type="email"
          placeholder="email"
          className="bg-gray-800  px-3 py-3 my-3 border w-full text-white rounded"
          name="email"
          required
          value={Data.email}
          onChange={change}
          aria-label="Email"
        />
        <input
          type="password"
          placeholder="password"
          className="bg-gray-800  px-3 py-3 my-3 border w-full rounded"
          name="password"
          value={Data.password}
          onChange={change}
        />
        <div className="w-full flex items-center justify-between">
          <button
            className="bg-blue-500 font-semibold text-black-xl rounded-sm"
            onClick={submit}
          >
            Login
          </button>
          <Link to="/login" className="text-gray-400 hover:text-gray-200">
            ALready having account,Click Here to login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
