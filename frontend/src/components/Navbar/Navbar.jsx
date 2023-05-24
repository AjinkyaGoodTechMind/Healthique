import React from "react";
import GMTlogo from "../../assets/images/Rectangle 2.png";
import "./Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../slices/sessionSlice";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import DummyImage from "../../assets/dummyImage.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { sessionUser } = useSelector((state) => state.sessionSlice);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const handleProfile = () => {
    handleClose();
    navigate("/profile");
  };
  const location = useLocation();

  return (
    <div style={{ backgroundColor: "rgb(255 237 237)", width: "100%" }}>
      <div className="navbar">
        <Link className="navbar-brand" to="/">
          <img src={GMTlogo} alt="..." style={{ width: "100%", marginLeft: "18px" }} />
        </Link>
        <div className="navbar-main" id="navbarSupportedContent">
          <li className="nav-item">
            <span className={sessionUser?._id ? "free" : "free2"}>FREE</span>
            <Link
              className="nav-link active"
              aria-current="page"
              to="/postYourProgram"
              style={
                location.pathname === "/postYourProgram"
                  ? { borderRadius: "10px", padding: "10px", color: "white", backgroundColor: "#d6193f" }
                  : null
              }
            >
              Post Your Program
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/"
              style={location.pathname === "/" ? { borderRadius: "10px", padding: "10px", color: "white", backgroundColor: "#d6193f" } : null}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/allPostedPrograms"
              style={
                location.pathname === "/allPostedPrograms"
                  ? { borderRadius: "10px", padding: "10px", color: "white", backgroundColor: "#d6193f" }
                  : null
              }
            >
              All Posted Programs
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/membership"
              style={
                location.pathname === "/membership" ? { borderRadius: "10px", padding: "10px", color: "white", backgroundColor: "#d6193f" } : null
              }
            >
              Membership
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/aboutUs"
              style={location.pathname === "/aboutUs" ? { borderRadius: "10px", padding: "10px", color: "white", backgroundColor: "#d6193f" } : null}
            >
              About Us
            </Link>
          </li>

          <li className="nav-item">
            <Link
              className="nav-link active"
              aria-current="page"
              to="/contactUs"
              style={
                location.pathname === "/contactUs" ? { borderRadius: "10px", padding: "10px", color: "white", backgroundColor: "#d6193f" } : null
              }
            >
              Contact Us
            </Link>
          </li>

          {sessionUser?._id && (
            <li className="nav-item">
              <Link
                className="nav-link active"
                aria-current="page"
                to="/dashboard"
                style={
                  location.pathname === "/dashboard" ? { borderRadius: "10px", padding: "10px", color: "white", backgroundColor: "#d6193f" } : null
                }
              >
                Dashboard
              </Link>
            </li>
          )}
        </div>
        <div>
          {sessionUser?._id ? (
            // <span
            //   className="btn btn-success"
            //   style={{ backgroundColor: "#d6193f", borderRadius: "25px", width: "150px", marginRight: "70px", border: "none" }}
            //   onClick={handleLogout}
            // >
            //   Logout
            // </span>
            <div>
              {sessionUser.profilePic ? (
                <img className="proilePicNavbar" src={sessionUser.profilePic} alt="" id="basic-button" onClick={handleClick}></img>
              ) : (
                <img className="proilePicNavbar" src={DummyImage} alt="" id="basic-button" onClick={handleClick}></img>
              )}
              <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                {/* <MenuItem onClick={handleClose}>My account</MenuItem> */}
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </div>
          ) : (
            <Link className="btn btn-success loginSignupButton" type="submit" to="/login">
              Login / SignUp
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
