import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearAdminSlice } from "../../../slices/adminSlice";
import { logout } from "../../../slices/sessionSlice";
import { clearUserSlice } from "../../../slices/userSlice";
import HeadDashboard from "./HeadDashboard";

import "./header.css";

const HeaderDashboard = () => {
  const navigate = useNavigate();
  const [click, setClick] = useState(false);
  const { sessionUser, isAuthenticated } = useSelector((state) => state.sessionSlice);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserSlice());
    dispatch(clearAdminSlice());
    navigate("/");
  };

  return (
    <>
      <HeadDashboard />
      <header style={{ backgroundColor: "#e9ecef" }}>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to="/" style={{ color: "black" }}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/courses" style={{ color: "black" }}>
                All Courses
              </Link>
            </li>
            <li>
              <Link to="/about" style={{ color: "black" }}>
                About
              </Link>
            </li>
            {/* <li>
              <a href="/team">Team</a>
            </li>
            <li>
              <a href="/pricing">Pricing</a>
            </li>
            <li>
              <a href="/journal">Journal</a>
            </li> */}
            <li>
              <Link to="/contact" style={{ color: "black" }}>
                Contact
              </Link>
            </li>

            {isAuthenticated ? (
              <li>
                <Link to="/dashboard" style={{ color: "black" }}>
                  Dashboard
                </Link>
              </li>
            ) : null}
          </ul>
          <div className="start">
            {isAuthenticated ? (
              <span onClick={handleLogout} className="button">
                Logout
              </span>
            ) : (
              <Link to="/login" className="button">
                Login / Register
              </Link>
            )}
          </div>
          <button className="toggle" onClick={() => setClick(!click)}>
            {click ? <i className="fa fa-times"> </i> : <i className="fa fa-bars"></i>}
          </button>
        </nav>
      </header>
    </>
  );
};

export default HeaderDashboard;
