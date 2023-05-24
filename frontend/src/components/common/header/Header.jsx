import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearAdminSlice } from "../../../slices/adminSlice";
import { logout } from "../../../slices/sessionSlice";
import { clearUserSlice } from "../../../slices/userSlice";
import Head from "./Head";
import "./header.css";

const Header = () => {
  const [click, setClick] = useState(false);
  const { sessionUser, isAuthenticated } = useSelector((state) => state.sessionSlice);
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearUserSlice());
    dispatch(clearAdminSlice());
  };

  return (
    <>
      <Head />
      <header>
        <nav className="flexSB">
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/courses">All Courses</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
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
              <Link to="/contact">Contact</Link>
            </li>
            {isAuthenticated ? (
              <li>
                <Link to="/dashboard">Dashboard</Link>
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

export default Header;
