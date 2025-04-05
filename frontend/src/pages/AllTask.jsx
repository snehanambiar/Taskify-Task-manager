import React, { useState, useEffect, useCallback } from "react";
import Card from "../components/Home/Card";
import InputData from "../components/Home/InputData";
import { IoIosAddCircleOutline } from "react-icons/io";
import axios from "axios";

const AllTask = () => {
  const [InputDiv, setInputDiv] = useState("hidden");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshFlag, setRefreshFlag] = useState(0); // Add a refresh flag to trigger re-fetching

  // Create a fetchData function
  const fetchData = useCallback(async () => {
    // Check if token exists
    const token = localStorage.getItem("token");

    if (!token) {
      setError("Authentication information missing. Please log in again.");
      setIsLoading(false);
      return;
    }

    console.log("Using token from localStorage:", token); // Debug log

    const headers = {
      authorization: `Bearer ${token}`, // Only send authorization header
    };

    try {
      setIsLoading(true);
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );

      console.log("API Response:", response.data); // Debug log

      // Check if response has the expected format
      if (response.data && response.data.data) {
        setData(response.data.data);
      } else {
        console.warn("Unexpected API response format:", response.data);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      console.error("Error response:", error.response); // Log detailed error

      if (error.response && error.response.status === 401) {
        setError("Your session has expired. Please log in again.");
      } else {
        setError("Failed to load tasks. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Function to trigger a refresh
  const refreshTasks = () => {
    setRefreshFlag((prev) => prev + 1); // Increment the refresh flag to trigger useEffect
  };

  useEffect(() => {
    fetchData();
  }, [fetchData, refreshFlag]); // Add refreshFlag as a dependency

  return (
    <>
      <div>
        <div className="w-full flex justify-end px-4 py-2">
          <button onClick={() => setInputDiv("fixed")}>
            <IoIosAddCircleOutline className="text-4xl text-gray-500 transition-all duration-300 hover:scale-105" />
          </button>
        </div>

        {isLoading ? (
          <p className="text-center py-8">Loading tasks...</p>
        ) : error ? (
          <p className="text-center py-8 text-red-500">{error}</p>
        ) : data.length === 0 ? (
          <p className="text-center py-8">
            No tasks found. Create your first task!
          </p>
        ) : (
          // Pass the refresh function to the Card component
          <Card
            home="true"
            setInputDiv={setInputDiv}
            data={data}
            refreshTasks={refreshTasks}
            setData={setData}
          />
        )}
      </div>
      {/* Pass refresh function to InputData component too */}
      <InputData
        InputDiv={InputDiv}
        setInputDiv={setInputDiv}
        refreshTasks={refreshTasks}
      />
    </>
  );
};

export default AllTask;
