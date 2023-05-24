import React, { useState } from "react";
import FooterLogo from "../../assets/images/FooterLogo.png";
import GtmLogo from "../../assets/logo/GTMlogo.png";
import location from "../../assets/images/pin.png";
import phone from "../../assets/images/telephone.png";
import "./Footer.css";
import axios from "axios";
import { Link } from "react-router-dom";
import InstantMessageSuccess from "../InstantMessageSuccess";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
  const [email, setEmail] = useState();

  const [error, setError] = useState(false); //Controls Alert

  const [message, setMessage] = useState(""); //Controls Message

  const handleSend = async () => {
    await axios
      .post(`/api/newsletter/signupNewsletter`, { email })
      .then(({ data }) => {
        setEmail("");
        setMessage("Email Submitted For Newsletters");
        setError(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="footer">
      <div className="footermaindiv">
        <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "20px" }}>
          <img style={{ width: "200px" }} src={FooterLogo} alt="" />
          <div>
            <a href="https://www.linkedin.com/company/healthique">
              <LinkedInIcon style={{ fill: "rgb(214, 25, 63)", fontSize: "40px", marginRight: "20px" }} />
            </a>
            <a href="https://www.facebook.com/healthique.in">
              <FacebookIcon style={{ fill: "rgb(214, 25, 63)", fontSize: "40px", marginRight: "20px" }} />
            </a>
            <a href="https://www.instagram.com/healthique.in">
              <InstagramIcon style={{ fill: "rgb(214, 25, 63)", fontSize: "40px" }} />
            </a>
          </div>
        </div>
        <hr />
        <div className="footer-main-div">
          <div>
            <ul style={{ listStyleType: "none", width: "250px", marginTop: "50px" }}>
              <li style={{ fontSize: "25px", fontWeight: "600" }}>For Companies</li>
              <Link to="/postYourProgram" style={{ color: "black", width: "200px" }}>
                Post Your Program
              </Link>
              <li style={{ color: "black", width: "200px" }}>Pre-Employement</li>
              <li style={{ color: "black", width: "200px" }}>Overseas Employment</li>
              <li style={{ color: "black", width: "200px" }}>Overseas Student Checkup</li>
            </ul>
          </div>
          <div>
            <ul style={{ listStyleType: "none", width: "200px", marginTop: "50px" }}>
              <li style={{ fontSize: "25px", fontWeight: "600" }}>For Programs</li>
              <li style={{ color: "black", width: "110px" }}>Wellness Aggregator</li>
              <li style={{ color: "black", width: "110px" }}>Quote Assitant</li>
              <li style={{ color: "black", width: "110px" }}>Plan & Pricing</li>
            </ul>
          </div>

          <div>
            <ul style={{ listStyleType: "none", width: "200px", marginTop: "50px" }}>
              <li style={{ fontSize: "25px", fontWeight: "600" }}>Helpful Links</li>
              <Link to="/contactUs" style={{ color: "black", width: "110px" }}>
                Contact Us
              </Link>
              <li style={{ color: "black", width: "110px" }}>Privacy Policy</li>
              <Link to="/termsAndConditions" style={{ color: "black", width: "110px" }}>
                Terms of Use
              </Link>
              <li style={{ color: "black", width: "110px" }}>Career</li>
            </ul>
          </div>

          <div>
            <ul style={{ listStyleType: "none", width: "150px", marginTop: "50px" }}>
              <li style={{ fontSize: "25px", fontWeight: "600" }}>Account</li>
              <Link to="/login" style={{ color: "black", width: "110px" }}>
                Login
              </Link>
              <li style={{ width: "400px" }}></li>
              <Link to="/signup" style={{ color: "black", width: "110px" }}>
                Signup
              </Link>
            </ul>
          </div>

          <div>
            <ul style={{ listStyleType: "none", width: "300px", marginTop: "50px" }}>
              <span style={{ fontSize: "25px", fontWeight: "600" }}>Newsletter Signup</span>
              <li style={{ width: "400px" }}>Weekly News ,New Program Alert,</li>
              <li style={{ width: "400px" }}>Quotation Alert, Quotation Assistance</li>
              <div style={{ display: "flex", alignItems: "center", marginTop: "20px" }}>
                <input
                  style={{ border: "none", borderRadius: "10px", padding: "10px" }}
                  type="text"
                  placeholder="Enter Your Email id"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></input>
                <span
                  style={{
                    height: "44px",
                    width: "100px",
                    backgroundColor: "#d6193f",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    marginLeft: "10px",
                    cursor: "pointer",
                  }}
                  onClick={handleSend}
                >
                  Submit
                </span>
              </div>
            </ul>
          </div>
        </div>
        <hr />
        <span style={{ width: "100%", textAlign: "center" }}>
          © 2023 HEALTHIQUE. All Right Reserved . Designed By{" "}
          <a href="https://goodtechmind.com/" target="_blank" rel="noopener noreferrer">
            <img style={{ width: "50px" }} src={GtmLogo} alt=""></img>
          </a>
        </span>
        <hr />
      </div>
      {error ? <InstantMessageSuccess message={message} setError={setError} /> : null}
    </div>
  );
}
