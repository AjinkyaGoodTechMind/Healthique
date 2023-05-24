import React from "react";
import "./AdminDashboardMain.css";

export default function AdminDashboardMain() {
  return (
    <div className="adminDashboardMain">
      <div className="adminDashboardMain-left">
        <div className="adminDashboardMain-left-cardsContainer">
          <div className="adminDashboardMain-left-card"></div>
          <div className="adminDashboardMain-left-card"></div>
        </div>
        <div className="adminDashboardMain-left-salesGrowthContainer"></div>
      </div>
      <div className="adminDashboardMain-right">
        <div className="adminDashboardMain-right-searchContainer"></div>
        <div className="adminDashboardMain-right-requestCheckingContainer"></div>
      </div>
    </div>
  );
}
