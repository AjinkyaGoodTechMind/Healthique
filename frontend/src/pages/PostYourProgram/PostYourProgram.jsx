import React, { useEffect, useState } from "react";
import "./postYourProgram.css";
import Navbar from "../../components/Navbar/Navbar";
import { Typography } from "@mui/material";
import axios from "axios";
import { City, State } from "country-state-city";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../slices/sessionSlice";
import { getSession } from "../../slices/sessionSlice";
import imageTest from "../../assets/R.png";
import Footer from "../../components/Footer/Footer";
import { useNavigate } from "react-router-dom";

export default function PostYourProgram() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [programTitles, setProgramTitles] = useState([]);

  const [certifications, setCertifications] = useState([]);

  const [activeStep, setActiveStep] = useState(0);

  const { sessionUser } = useSelector((state) => state.sessionSlice);

  const [user, setUser] = useState({
    email: "",
    password: "",
    reEnterPassword: "",
  });

  const handleChange2 = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    if (activeStep !== 0) {
      setActiveStep((prev) => prev - 1);
    }
  };

  const [newProgram, setNewProgram] = useState({
    title: "",
    location: "",
    state: "",
    city: "",
    budget: "",
    date: "",
    industry: "",
    certificationRequired: "",
    specificRequirements: "",
    reportDelivery: "",
    parametersRequired: "",
    personCount: "",
    lastQuotationDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({
      ...newProgram,
      [name]: value,
    });
  };

  const handlePostNewProgram = async () => {
    await axios
      .post(`/api/jobPosts/postNewJob`, newProgram)
      .then(({ data }) => {
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const getProgramTitles = async () => {
      await axios
        .get(`/api/customer/getProgramTitles`)
        .then(({ data }) => {
          setProgramTitles(data.programTitles);
          setCertifications(data.certifications);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getProgramTitles();
  }, []);

  const handleRegister = async (e) => {
    const { password, reEnterPassword } = user;

    e.preventDefault();

    if (password !== "" && password === reEnterPassword) {
      if (sessionUser?._id) {
        handlePostNewProgram();
      } else {
        await axios
          .post(`/api/session/register`, user)
          .then(({ data }) => {
            handlePostNewProgram();
          })
          .catch((err) => {
            console.log(err);
          });
        dispatch(getSession());
      }
    } else {
      if (password === "") {
        alert("Please enter password");
      } else if (password !== reEnterPassword) {
        alert("Password and Re-entered Password does not match");
      }
    }
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="postYourProgram">
        <div className="postYourProgram-box">
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              width: "260px",
              paddingRight: "30px",
              borderRight: "1px solid rgb(160, 160, 160)",
            }}
          >
            <span style={{ fontSize: "20px" }}>
              Tell us your requirements and <span style={{ fontWeight: "600" }}>Get Free Quotations</span>
            </span>
            <img style={{ marginTop: "80px" }} src={imageTest} alt="" />
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", height: "100%", flex: "1" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Program Details
            </Typography>
            <form onSubmit={handlePostNewProgram}>
              {activeStep === 0 && (
                <>
                  <div style={{ width: "100%", display: "flex", marginLeft: "20px", marginTop: "20px" }}>
                    <span>Select Program Title</span>
                  </div>
                  <select required={true} name="title" onChange={handleChange}>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    {programTitles.map((e, index) => (
                      <option key={index} value={e.title}>
                        {e.title}
                      </option>
                    ))}
                  </select>

                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Enter Budget Per Person</span>
                  </div>
                  <input
                    type="text"
                    required={true}
                    name="budget"
                    value={newProgram.budget}
                    placeholder="Enter Budget"
                    onChange={handleChange}
                  ></input>

                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Enter Person Count</span>
                  </div>
                  <input
                    type="number"
                    required={true}
                    name="personCount"
                    value={newProgram.personCount}
                    placeholder="Enter Person Count"
                    onChange={handleChange}
                  ></input>
                </>
              )}

              {activeStep === 1 && (
                <>
                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Enter Program Date</span>
                  </div>
                  <input
                    type="date"
                    required={true}
                    name="date"
                    value={newProgram.date}
                    placeholder="Enter Program Date"
                    onChange={handleChange}
                  ></input>

                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Enter Last Quotation Date</span>
                  </div>
                  <input
                    type="date"
                    required={true}
                    name="lastQuotationDate"
                    value={newProgram.lastQuotationDate}
                    placeholder="Enter Last Quotation Date"
                    onChange={handleChange}
                  ></input>
                </>
              )}

              {activeStep === 2 && (
                <>
                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Enter Location</span>
                  </div>
                  <input
                    type="text"
                    required={true}
                    name="location"
                    value={newProgram.location}
                    placeholder="Enter Location"
                    onChange={handleChange}
                  ></input>

                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Select State</span>
                  </div>
                  <select required={true} name="state" onChange={handleChange}>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    {State &&
                      State.getStatesOfCountry("IN").map((item) => (
                        <option key={item.name} value={item.name}>
                          {item.name}
                        </option>
                      ))}
                  </select>

                  {newProgram?.state && (
                    <>
                      <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                        <span>Select City</span>
                      </div>
                      <select required={true} name="city" onChange={handleChange}>
                        <option value="" disabled selected>
                          Select your option
                        </option>
                        {City &&
                          City.getCitiesOfCountry("IN").map((item) => (
                            <option key={item.name} value={item.name}>
                              {item.name}
                            </option>
                          ))}
                      </select>
                    </>
                  )}
                </>
              )}

              {!sessionUser?._id && activeStep === 3 && (
                <>
                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Enter Email</span>
                  </div>
                  <input type="text" required={true} name="email" value={user.email} placeholder="Enter Email" onChange={handleChange2}></input>

                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Enter Password</span>
                  </div>
                  <input
                    type="text"
                    required={true}
                    name="password"
                    value={user.password}
                    placeholder="Enter Password"
                    onChange={handleChange2}
                  ></input>

                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Re-Enter Password</span>
                  </div>
                  <input
                    type="text"
                    required={true}
                    name="reEnterPassword"
                    value={user.reEnterPassword}
                    placeholder="Re-Enter Password"
                    onChange={handleChange2}
                  ></input>
                </>
              )}
            </form>
            <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
              <button
                className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl "
                style={
                  activeStep === 0
                    ? { marginRight: "20px", backgroundColor: "gray", border: "none", width: "200px" }
                    : { marginRight: "20px", width: "200px" }
                }
                onClick={handleBack}
              >
                Back
              </button>

              {!sessionUser?._id ? (
                <>
                  {activeStep !== 3 ? (
                    <button
                      style={{ width: "200px" }}
                      className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl "
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      style={{ width: "200px" }}
                      className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl "
                      onClick={handleRegister}
                    >
                      Submit
                    </button>
                  )}
                </>
              ) : (
                <>
                  {activeStep !== 2 ? (
                    <button
                      style={{ width: "200px" }}
                      className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl "
                      onClick={handleNext}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      style={{ width: "200px" }}
                      className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl "
                      onClick={handleRegister}
                    >
                      Submit
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
