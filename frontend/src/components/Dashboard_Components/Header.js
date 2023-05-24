import React from "react";
import "./Header.css";
import profilrImg from "../../assets/images/dummyProfileImage.png";
import { Link } from "react-router-dom";

export default function DashboardHeader() {
  return (
    <>
      <div className="header-content">
        <span className="heaer-text">Welcome Admin !</span>

        <div className="Header-right">
          <div className="Header-profile-name">
            <span> Ankita Ray</span>
            <Link> Manager</Link>
          </div>
          <img className="mx-3 profilePic" src={profilrImg} alt="" />
        </div>
      </div>
    </>
  );
}
