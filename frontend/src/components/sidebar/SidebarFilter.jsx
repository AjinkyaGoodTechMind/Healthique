import { useState } from "react";
import "./sidebar.css";

export default function SidebarFilter() {
  const [location, setLocation] = useState("");

  const [date, setDate] = useState("");

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <form className="filterForm">
          <span style={{ fontSize: "25px", marginBottom: "20px", color: "#d6193f", fontWeight: "600" }}>Search</span>
          <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
            <span>Location</span>
            <input type="text" placeholder="Location" clas="search2" className="searchInputs2" onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
            <span>Event Date</span>
            <input type="date" placeholder="Event Date" name="search2" className="searchInputs2" onChange={(e) => setDate(e.target.value)} />
          </div>
          <button className="filterButton" type="submit">
            <i className="fa fa-search"></i>
          </button>
        </form>
      </div>
    </div>
  );
}
