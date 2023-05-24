import "./sidebar.css";

import LineStyle from "@mui/icons-material/LineStyle";

import PermIdentity from "@mui/icons-material/PermIdentity";

import ChecklistIcon from "@mui/icons-material/Checklist";

import BarChart from "@mui/icons-material/BarChart";

import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import NewspaperIcon from "@mui/icons-material/Newspaper";
import ContactMailIcon from "@mui/icons-material/ContactMail";

import { ImTree } from "react-icons/im";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddCardIcon from "@mui/icons-material/AddCard";

import MessageIcon from "@mui/icons-material/Message";

export default function Sidebar() {
  const { sessionUser, isAuthenticated } = useSelector((state) => state.sessionSlice);

  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          {/* <h5>{sessionUser.username}</h5> */}
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/dashboard" className="link">
              <li className="sidebarListItem active">
                <LineStyle className="sidebarIcon" />
                Dashboard
              </li>
            </Link>
            <Link to="/awardedProgramsAdmin" className="link">
              <li className="sidebarListItem">
                <ChecklistIcon className="sidebarIcon" />
                Awarded Programs
              </li>
            </Link>
            <Link to="/pendingApprovalsAdmin" className="link">
              <li className="sidebarListItem">
                <ChecklistIcon className="sidebarIcon" />
                Pending Program Approvals
              </li>
            </Link>
            <Link to="/allPostedProgramsAdmin" className="link">
              <li className="sidebarListItem">
                <FeedOutlinedIcon className="sidebarIcon" />
                All Posted Programs
              </li>
            </Link>
            <Link to="/clientsListThisMonth" className="link">
              <li className="sidebarListItem">
                <CalendarMonthIcon className="sidebarIcon" />
                New Clients This Month
              </li>
            </Link>
            <Link to="/clientsListAdmin" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                All Clients
              </li>
            </Link>
            <Link to="/vendorsListThisMonth" className="link">
              <li className="sidebarListItem">
                <CalendarMonthIcon className="sidebarIcon" />
                New Vendors This Month
              </li>
            </Link>

            <Link to="/vendorsListAdmin" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Vendors
              </li>
            </Link>
          </ul>
        </div>

        {sessionUser && sessionUser.email === "admin@gmail.com" && (
          <div className="sidebarMenu">
            <h3 className="sidebarTitle">Super Admin Features</h3>
            <ul className="sidebarList">
              <Link to="/addProgramsAdmin" className="link">
                <li className="sidebarListItem">
                  <AddCardIcon className="sidebarIcon" />
                  Add Programs
                </li>
              </Link>

              <Link to="/addCertificationsAdmin" className="link">
                <li className="sidebarListItem">
                  <AddCardIcon className="sidebarIcon" />
                  Add Certifications
                </li>
              </Link>

              <Link to="/newsleterEmails" className="link">
                <li className="sidebarListItem">
                  <ContactMailIcon className="sidebarIcon" />
                  Newsletter Emails
                </li>
              </Link>

              <Link to="/sendNewsletters" className="link">
                <li className="sidebarListItem">
                  <NewspaperIcon className="sidebarIcon" />
                  Send Newsletters
                </li>
              </Link>

              <Link to="/createAdmins" className="link">
                <li className="sidebarListItem">
                  <AdminPanelSettingsIcon className="sidebarIcon" />
                  Create Admins
                </li>
              </Link>

              <Link to="/changeHero" className="link">
                <li className="sidebarListItem">
                  <AdminPanelSettingsIcon className="sidebarIcon" />
                  Change Hero
                </li>
              </Link>

              <Link to="/editMembershipPlans" className="link">
                <li className="sidebarListItem">
                  <AdminPanelSettingsIcon className="sidebarIcon" />
                  Edit Membership Plans
                </li>
              </Link>

              <Link to="/queries" className="link">
                <li className="sidebarListItem">
                  <MessageIcon className="sidebarIcon" />
                  Queries
                </li>
              </Link>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
