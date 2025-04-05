import React, { useState, useEffect } from "react";
import { CgNotes } from "react-icons/cg";
import { FaCheckSquare } from "react-icons/fa";
import { Link } from "react-router-dom";
import { authActions } from "../../store/auth";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const SideBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const data = [
    { title: "All Task", icons: <CgNotes />, link: "/" },
    {
      title: "Completed Task",
      icons: <FaCheckSquare />,
      link: "/completedTask",
    },
    { title: "Important Task", icons: <CgNotes />, link: "/importantTask" },
    { title: "Incompleted Task", icons: <CgNotes />, link: "/incompletedTask" },
  ];
  const [Data, setData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer $(localStorage.getItem("token"))`,
  };

  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        "http://localhost:1000/api/v2/get-all-tasks",
        { headers }
      );
      console.log(response);
    };
    fetch();
  }, []);

  const logout = () => {
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch(authActions.logout());
    navigate("/signup");
  };

  return (
    <>
      {Data && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{Data.username}</h2>
          <h4 className="mb-1 text-gray-400">{Data.email}</h4>
        </div>
      )}

      <div>
        {data.map((items, i) => (
          <Link
            to={items.link}
            key={i}
            className="my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300"
          >
            {items.icons} {items.title}
          </Link>
        ))}
      </div>
      <div className="bg-gray-500 w-full p-2 rounded" onClick={logout}>
        Log Out
      </div>
    </>
  );
};

export default SideBar;
