import "./sidebar.css";

import LineStyle from "@mui/icons-material/LineStyle";
import Timeline from "@mui/icons-material/Timeline";
import ChecklistIcon from "@mui/icons-material/Checklist";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function SidebarCustomer() {
  const { sessionUser, isAuthenticated } = useSelector((state) => state.sessionSlice);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h5>{sessionUser.memberName}</h5>
          {/* <h3 className="sidebarTitle">Dashboard</h3> */}
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
            <Link to="/awardedQuotationsCustomer" className="link">
              <li className="sidebarListItem">
                <AssignmentTurnedInOutlinedIcon className="sidebarIcon" />
                Awarded Programs
              </li>
            </Link>
            <Link to="/pendingQuotationsCustomer" className="link">
              <li className="sidebarListItem">
                <ChecklistIcon className="sidebarIcon" />
                Pending Quotations
              </li>
            </Link>
            <Link to="/allPostedProgramsCustomer" className="link">
              <li className="sidebarListItem">
                <FeedOutlinedIcon className="sidebarIcon" />
                All Posted Programs
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
