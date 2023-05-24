import React from "react";
import "./topbar.css";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/sessionSlice";
import { clearUserSlice } from "../../slices/userSlice";
import { clearAdminSlice } from "../../slices/adminSlice";

export default function Topbar() {
  const { sessionUser, isAuthenticated } = useSelector((state) => state.sessionSlice);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserSlice());
    dispatch(clearAdminSlice());
  };
  return isAuthenticated ? (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="dashboard">Dashboard</span>
        </div>
        <h5 className="referralCode">Referral Code: {sessionUser._id}</h5>
        <div className="topRight">
          {/* <span className="logout-button" onClick={handleLogout}>
            Logout
          </span> */}
        </div>
      </div>
    </div>
  ) : null;
}
