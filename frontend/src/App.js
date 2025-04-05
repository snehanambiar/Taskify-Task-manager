import React, { useEffect } from "react";
import Home from "./pages/Home";
import AllTask from "./pages/AllTask";
import ImportantTask from "./pages/ImportantTask";
import IncompletedTask from "./pages/IncompletedTask";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import CompletedTask from "./pages/CompletedTask";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "./store/auth";

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem("id") && localStorage.getItem("token")) {
      dispatch(authActions.login()); // Log in the user
    } else if (!isLoggedIn) {
      navigate("/signup"); // Redirect if not logged in
    }
  }, []);

  return (
    <div className="bg-gray-900 text-white h-screen p-2 relative">
      <Routes>
        <Route exact path="/" element={<Home />}>
          <Route index element={<AllTask />} />
          <Route path="/importantTask" element={<ImportantTask />} />
          <Route path="/incompletedTask" element={<IncompletedTask />} />

          <Route path="/completedTask" element={<CompletedTask />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default App;
