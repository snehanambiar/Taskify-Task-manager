import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const Card = ({ home, setInputDiv, data, setData }) => {
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const [Tasks, setTasks] = useState([]);

  // ✅ Handle Task Completion
  const handleCompletedTask = async (id) => {
    try {
      console.log("Updating task completion status for:", id);
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-complete-task/${id}`,
        {},
        { headers }
      );
      console.log("Response:", response.data);
      alert(response.data.message);

      // ✅ Update task status locally
      setData((prevData) =>
        prevData.map((task) =>
          task._id === id ? { ...task, status: !task.status } : task
        )
      );
    } catch (error) {
      console.log(
        "Error updating task:",
        error.response?.data || error.message
      );
    }
  };

  // ✅ Handle Task Importance
  const handleImportant = async (id) => {
    try {
      console.log("Marking task as important:", id);
      const response = await axios.put(
        `http://localhost:1000/api/v2/update-important-task/${id}`,
        {},
        { headers }
      );
      console.log("Response:", response.data);
      alert(response.data.message);

      // ✅ Update importance state locally
      setData((prevData) =>
        prevData.map((task) =>
          task._id === id ? { ...task, important: !task.important } : task
        )
      );
    } catch (error) {
      console.log(
        "Error marking important:",
        error.response?.data || error.message
      );
    }
  };

  const DeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:1000/api/v2/delete-task/${id}`, {
        headers,
      });

      // Update the state by removing the deleted task
      setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));

      console.log("Task deleted successfully");
    } catch (error) {
      console.log("Error deleting task:", error);
    }
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {/* ✅ Show message if no tasks */}
      {(!data || data.length === 0) && (
        <p className="text-center text-white col-span-3">No tasks available.</p>
      )}

      {/* ✅ Map through data safely */}
      {data &&
        data.map((item, i) => (
          <div
            key={item._id || i}
            className="flex flex-col justify-between p-4 border rounded-xl bg-gray-800 shadow-md"
          >
            {/* ✅ Task Title & Description */}
            <div>
              <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              <p className="text-gray-300">{item.desc}</p>
            </div>

            {/* ✅ Action Buttons */}
            <div className="mt-4 w-full flex items-center">
              <button
                className={`${
                  item?.status === false ? "bg-red-500" : "bg-green-600"
                } p-2 rounded w-3/6`}
                onClick={() => handleCompletedTask(item._id)}
              >
                {item?.status === false ? "InCompleted" : "Created"}
              </button>

              <div className="text-white p-2 w-3/6 text-2xl font-semibold flex justify-around">
                {/* ✅ Mark Task as Important */}
                <button onClick={() => handleImportant(item._id)}>
                  <FaHeart className={item.important ? "text-red-500" : ""} />
                </button>
                {/* ✅ Edit Task */}
                <button>
                  <FaEdit />
                </button>
                {/* ✅ Move Task */}
                <button onClick={() => DeleteTask(item._id)}>
                  <MdDelete />
                </button>
              </div>
            </div>
          </div>
        ))}

      {/* ✅ Add Task Button (if `home` is true) */}
      {home === "true" && (
        <div
          className="flex flex-col justify-center items-center bg-gray-800 border rounded-xl p-4 text-gray-300 hover:scale-105 hover:cursor-pointer"
          onClick={() => setInputDiv("fixed")}
        >
          <IoIosAddCircleOutline className="text-5xl" />
          <h3 className="text-2xl mt-4">Add Task</h3>
        </div>
      )}
    </div>
  );
};

export default Card;
