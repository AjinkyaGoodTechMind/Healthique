import React from "react";
import "./sidebar.css";
import logo from "../../assets/logo/GTMlogo.png";

export default function DashboardSidebar() {
  return (
    <div className="dashboard-sidebar">
      <img src={logo} alt="" />
      <div className="sidebar-manu">
        <p style={{ color: "#224ADA" }}>
          <i className="fa-solid fa-grip"></i>
        </p>
        <p>
          <i className="fa-solid fa-user-group"></i>
        </p>
        <p>
          <i className="fa-solid fa-gear"></i>
        </p>
        <p>
          <i className="fa-solid fa-right-from-bracket"></i>
        </p>
      </div>
    </div>
  );
}
