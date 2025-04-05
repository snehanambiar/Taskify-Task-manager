import React, { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";

const InputData = ({ InputDiv, setInputDiv }) => {
  const [Data, setData] = useState({ title: "", desc: "" });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submitData = async () => {
    if (!Data.title || !Data.desc) {
      alert("All fields are required");
      return;
    }

    try {
      const userId = localStorage.getItem("id"); // Get userId here

      const response = await axios.post(
        "http://localhost:1000/api/v2/create-task",
        { ...Data, userId }, // Send userId in the request body
        { headers }
      );

      console.log("Task created successfully:", response.data);
      alert("Task added successfully!");

      // Clear input fields
      setData({ title: "", desc: "" });

      // Hide the input modal
      setInputDiv("hidden");
    } catch (error) {
      console.error(
        "Error creating task:",
        error.response?.data || error.message
      );
      alert("Failed to add task. Please try again.");
    }
  };

  return (
    <>
      <div
        className={`${InputDiv} top-0 left-0 bg-gray-800 opacity-80 h-screen w-full fixed`}
      ></div>
      <div
        className={`${InputDiv} top-0 left-0 flex items-center justify-center h-screen w-full fixed`}
      >
        <div className="w-3/6 bg-gray-900 p-4 rounded-xl">
          <div className="flex justify-end">
            <button className="text-xl" onClick={() => setInputDiv("hidden")}>
              <RxCross2 />
            </button>
          </div>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.title}
            onChange={change}
          />
          <textarea
            name="desc"
            cols="30"
            rows="10"
            placeholder="Description"
            className="px-3 py-2 rounded w-full bg-gray-700 my-3"
            value={Data.desc}
            onChange={change}
          ></textarea>
          <button
            className="px-3 py-2 bg-blue-400 rounded text-black text-xl"
            onClick={submitData}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default InputData;
