import React, { useEffect, useState } from "react";
import "./Design.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Box, Modal, Typography } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { login } from "../../slices/sessionSlice";
import moment from "moment";

const Design = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { sessionUser } = useSelector((state) => state.sessionSlice);

  const [postId, setPostId] = useState("");

  const [jobPosts, setJobPosts] = useState([]);

  const [quotation, setQuotation] = useState("");

  const [open, setOpen] = useState(false);

  const [openDetails, setOpenDetails] = useState(false);

  const [openSignup, setOpenSignup] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [details, setDetails] = useState({
    location: "",
    personCount: "",
    budget: "",
    date: "",
    lastQuotationDate: "",
  });

  const handleOpen = (e) => {
    if (sessionUser._id) {
      setPostId(e);
      setOpen(true);
    } else {
      setOpenSignup(true);
    }
  };
  const handleClose = () => setOpen(false);

  const handleOpenDetails = (e) => {
    setPostId(e._id);
    setDetails(e);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => setOpenDetails(false);

  const handleCloseSignup = () => setOpenSignup(false);

  const style = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };

  const getData = async () => {
    await axios
      .get(`/api/jobPosts/getAllPosts`)
      .then(({ data }) => {
        console.log(data);
        setJobPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleQuoteNow = async (e) => {
    e.preventDefault();

    await axios
      .post(`/api/bids/postBid`, { postId, quotation })
      .then(({ data }) => {
        handleClose();
        handleCloseDetails();
        console.log("newQuote", data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    if (password !== "") {
      dispatch(login({ email, password }));
    } else {
      alert("Please Enter Password");
    }
  };

  return (
    <div>
      <div className="programsContainer-1">
        <div>
          <h1 style={{ marginTop: "50px", marginBottom: "30px" }}>
            Featured <span style={{ color: "#d6193f" }}>Programs</span>
          </h1>
        </div>
        <div className="programsContainer">
          {jobPosts.slice(0, 5).map((e, index) => {
            return (
              e.approvalStatus === "approved" && (
                <div className="programsBox" key={index}>
                  <div className="programsBox-title-div">
                    <div style={{ display: "flex" }}>
                      <span className="programsBox-title">{e.title}</span>
                      <span style={{ marginLeft: "10px", color: "gray", fontWeight: "600", marginTop: "15px" }}>#{e.postId}</span>
                    </div>
                    <div className="programsBox-button-div">
                      <span className="programsBox-button" onClick={() => handleOpenDetails(e)}>
                        View Details
                      </span>

                      <span className="programsBox-button" onClick={() => handleOpen(e._id)}>
                        Quote Now
                      </span>
                    </div>
                  </div>
                  <span className="programBox-details">
                    Location : {e.location} | Budget : {e.budget} P/P | Event Date : {moment(e.date).format("DD/MM/YYYY ")} | Last Quote Date :
                    {moment(e.lastQuotationDate).format("DD/MM/YYYY ")} | Person Count : {e.minPersonCount} - {e.maxPersonCount}
                  </span>
                </div>
              )
            );
          })}
        </div>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="register w-1/2 h-96 ml-24">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Quotation Per Person
            </Typography>
            <form onSubmit={handleQuoteNow} style={{ marginTop: "20px" }}>
              <input
                type="text"
                required={true}
                name="quotation"
                value={quotation}
                placeholder="Enter Quotation Per Person"
                onChange={(e) => setQuotation(e.target.value)}
              ></input>
              <button style={{ marginTop: "20px" }} className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">
                Post
              </button>
            </form>
          </div>
        </Box>
      </Modal>

      <Modal open={openDetails} onClose={handleCloseDetails} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="register w-1/2 h-96 ml-24">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {details && details.title}
            </Typography>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "20px", width: "100%", alignItems: "flex-start" }}>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Location : {details.location}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Person Count : {details.personCount} Persons</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Budget : {details.budget} P/P</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Event Date : {details.date}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Last Quote Date :{details.lastQuotationDate}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Industry :{details.industry}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Certification Required :{details.certificationRequired}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Specific Requirements :{details.specificRequirements}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Report Delivery :{details.reportDelivery}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Parameters Required :{details.parametersRequired}</span>
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <span className="programsBox-button" onClick={() => handleOpen(details._id)}>
                Quote Now
              </span>
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={openSignup} onClose={handleCloseSignup} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="memberLogin">
            <div className="login mb-28 w-1/2 ml-48 ">
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Login or Register to Continue....
              </Typography>
              <form style={{ marginTop: "20px" }} onSubmit={handleLogin}>
                <input
                  type="text"
                  required={true}
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your Email"
                ></input>
                <input
                  type="password"
                  name="password"
                  required={true}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your Password"
                ></input>
                <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl " type="submit">
                  Login
                </button>
              </form>

              <div>OR</div>
              <Link to="/signup">
                <button className="p-2 pl-36 pr-28 clicablediv bg-blue-500 h-10 rounded-md text-white  text-xl ">Register</button>
              </Link>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default Design;
