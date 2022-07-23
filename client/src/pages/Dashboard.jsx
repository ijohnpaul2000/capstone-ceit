import React from "react";
import { useDispatch } from "react-redux";
import { logout } from "../features/authSlice";
const Dashboard = () => {
  const dispatch = useDispatch();
  return (
    <div>
      <button onClick={() => dispatch(logout())}>Logout</button>
    </div>
  );
};

export default Dashboard;
