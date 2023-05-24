import "./dashboard.css";

import { Country, State, City } from "country-state-city";

import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";

import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";

import SidebarCustomer from "../../components/sidebar/SidebarCustomer";

import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";
import FeaturedInfoCustomer from "../../components/featuredInfo/FeaturedInfoCustomer";
import moment from "moment";

export default function DashboardCustomer() {
  const { sessionUser, loading } = useSelector((state) => state.sessionSlice);

  const [jobPosts, setJobPosts] = useState([]);

  const [programTitles, setProgramTitles] = useState([]);

  const [certifications, setCertifications] = useState([]);

  const [postId, setPostId] = useState("");

  const [quotations, setQuotations] = useState([]);

  const [open, setOpen] = useState(false);
  const [openQuotations, setOpenQuotations] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openDetails, setOpenDetails] = useState(false);
  const handleCloseQuotations = () => setOpenQuotations(false);
  const [openSpocDetails, setOpenSpocDetails] = useState(false);

  const [openEdit, setOpenEdit] = useState(false);
  const handleOpenEdit = (e) => {
    setPostId(e._id);
    setNewProgram(e);
    setOpenEdit(true);
  };

  const handleCloseEdit = () => {
    setNewProgram({
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
    setOpenEdit(false);
  };

  const [details, setDetails] = useState({
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
    minPersonCount: "",
    maxPersonCount: "",
    lastQuotationDate: "",
  });

  const handleOpenQuotations = async (postId) => {
    setPostId(postId);
    await axios
      .get(`/api/bids/getBidsCustomer?postId=${postId}`)
      .then(({ data }) => {
        setQuotations(data);
        setOpenQuotations(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpenDetails = (e) => {
    setPostId(e._id);
    setDetails(e);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => setOpenDetails(false);

  const handleOpenSpocDetails = (id) => {
    const post = jobPosts.filter((e) => e._id.toString() === id.toString());

    setDetails(post[0]);
    setOpenSpocDetails(true);
  };

  const handleCloseSpocDetails = () => {
    setOpenSpocDetails(false);
  };

  const style = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    height: "800px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };

  const style2 = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 900,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "20px",
    boxShadow: 24,
    p: 4,
  };

  const style3 = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };

  const style4 = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
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
    minPersonCount: "",
    maxPersonCount: "",
    lastQuotationDate: "",
  });

  console.log(newProgram);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({
      ...newProgram,
      [name]: value,
    });
  };

  const getData = async () => {
    await axios
      .get(`/api/jobPosts/getUserPosts`)
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

  const handlePostNewProgram = async (event) => {
    event.preventDefault();
    await axios
      .post(`/api/jobPosts/postNewJob`, newProgram)
      .then(({ data }) => {
        handleClose();
        console.log("newPost", data);
        let newData = jobPosts;
        setJobPosts([...newData, data]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAcceptQuotation = async (bidId) => {
    await axios
      .put(`/api/bids/acceptBid?bidId=${bidId}&postId=${postId}`)
      .then(({ data }) => {
        handleCloseQuotations();
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleRejectQuotation = async (bidId) => {
    await axios
      .put(`/api/bids/rejectBid?bidId=${bidId}`)
      .then(({ data }) => {
        console.log(data);
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

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/jobPosts/updatePost`, { newProgram, postId })
      .then(({ data }) => {
        getData();
        handleCloseEdit();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <SidebarCustomer />
        <div className="dashboard-main">
          <FeaturedInfoCustomer />

          <div className="homeWidgets">
            <span className="postNewProgramButton" onClick={handleOpen}>
              Post New Program
            </span>
            <span className="widgetTitle">Posted Programs</span>
            <div className="programsContainer">
              {jobPosts.slice(0, 5).map((e, index) => {
                return (
                  <div className="programsBox" key={index}>
                    <div className="programsBox-title-div">
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <span className="programsBox-title">{e.title}</span>
                        <span style={{ marginLeft: "10px", color: "gray", fontWeight: "600" }}>#{e.postId}</span>
                      </div>

                      <div className="programsBox-button-div">
                        <span className="programsBox-button2" style={{ marginRight: "20px" }} onClick={() => handleOpenDetails(e)}>
                          View Details
                        </span>
                        {(e.approvalStatus === "pending" || e.approvalStatus === "rejected" || e.approvalStatus === "expired") && (
                          <span className="programsBox-button2" onClick={() => handleOpenEdit(e)}>
                            Edit
                          </span>
                        )}
                        {(e.approvalStatus === "approved" || e.approvalStatus === "expired") && !e.isQuotationAccepted && (
                          <span className="programsBox-button2" onClick={() => handleOpenQuotations(e._id)}>
                            Quotations
                          </span>
                        )}
                        {e.isQuotationAccepted && (
                          <span className="programsBox-button2" onClick={() => handleOpenSpocDetails(e._id)}>
                            SPOC Details
                          </span>
                        )}
                      </div>
                    </div>
                    <div style={{ margin: "5px 0px", display: "flex", alignItems: "center" }}>
                      <span style={{ fontWeight: "600", marginRight: "20px" }}>
                        Status: {e.approvalStatus === "pending" && <span style={{ color: "#ffa800" }}>{e.approvalStatus.toUpperCase()}</span>}
                        {e.approvalStatus === "approved" && <span style={{ color: "green" }}>{e.approvalStatus.toUpperCase()}</span>}
                        {e.approvalStatus === "rejected" && <span style={{ color: "red" }}>{e.approvalStatus.toUpperCase()}</span>}
                        {e.approvalStatus === "expired" && <span style={{ color: "red" }}>{e.approvalStatus.toUpperCase()}</span>}
                      </span>
                      {e.approvalStatus === "rejected" && (
                        <span style={{ fontWeight: "600" }}>
                          Reason For Rejection: <span style={{ color: "red" }}>{e.rejectedReason}</span>
                        </span>
                      )}
                    </div>

                    <span className="programBox-details">
                      Location : {e.location} | Budget : {e.budget} P/P | Event Date : {moment(e.date).format("DD/MM/YYYY ")} | Last Quote Date :
                      {moment(e.lastQuotationDate).format("DD/MM/YYYY ")} | Person Count : {e.minPersonCount} - {e.maxPersonCount}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="register w-1/2 h-96 ml-24" style={{ overflowY: "scroll", overflowX: "hidden" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Program Details
            </Typography>
            <form onSubmit={handlePostNewProgram}>
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
              <input type="text" required={true} name="budget" value={newProgram.budget} placeholder="Enter Budget" onChange={handleChange}></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Minimum Person Count</span>
              </div>
              <input
                type="number"
                required={true}
                name="minPersonCount"
                value={newProgram.minPersonCount}
                placeholder="Enter Person Count"
                onChange={handleChange}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Maximum Person Count</span>
              </div>
              <input
                type="number"
                required={true}
                name="maxPersonCount"
                value={newProgram.maxPersonCount}
                placeholder="Enter Person Count"
                onChange={handleChange}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Program Date</span>
              </div>
              <input type="date" required={true} name="date" value={newProgram.date} placeholder="Enter Program Date" onChange={handleChange}></input>

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
              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Industry</span>
              </div>
              <input
                type="text"
                required={true}
                name="industry"
                placeholder="Enter Industry"
                value={newProgram.industry}
                onChange={handleChange}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Select Certification Required</span>
              </div>
              <select required={true} name="certificationRequired" onChange={handleChange}>
                <option value="" disabled selected>
                  Select your option
                </option>
                {certifications.map((e, index) => (
                  <option key={index} value={e.title}>
                    {e.title}
                  </option>
                ))}
              </select>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Select Report Delivery</span>
              </div>
              <select required={true} name="reportDelivery" onChange={handleChange}>
                <option value="" disabled selected>
                  Select your option
                </option>
                <option value="Hard Copy">Hard Copy</option>
                <option value="Soft Copy">Soft Copy</option>
                <option value="Hard Copy & Soft Copy">Hard Copy & Soft Copy</option>
              </select>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Specific Requirements</span>
              </div>
              <input
                type="text"
                required={true}
                name="specificRequirements"
                placeholder="Specific Requirements..."
                value={newProgram.specificRequirements}
                onChange={handleChange}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Parameters Required</span>
              </div>
              <textarea className="textAreaAddProgram" required={true} name="parametersRequired" onChange={handleChange}></textarea>

              <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">Post</button>
            </form>
          </div>
        </Box>
      </Modal>
      <Modal open={openQuotations} onClose={handleCloseQuotations} aria-labelledby="modal-modal-title">
        <Box sx={style2}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            All Available Quotations
          </Typography>
          <div className="quotationContainer">
            {quotations.map((e, index) => {
              return (
                <div className="quotationBox" key={index}>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Vendor Id</span>
                    <span className="quotationAmount" style={{ marginRight: "20px" }}>
                      {e.vendorId2}
                    </span>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <span>Quotation Amount</span>
                    <span className="quotationAmount">Rs {e.quotation} per person</span>
                  </div>

                  {e.status === "pending" ? (
                    <>
                      <span className="programsBox-button3" onClick={() => handleAcceptQuotation(e._id)}>
                        Accept
                      </span>
                      <span className="programsBox-button3" onClick={() => handleRejectQuotation(e._id)}>
                        Reject
                      </span>
                    </>
                  ) : (
                    <span>{e.status}</span>
                  )}
                </div>
              );
            })}
          </div>
        </Box>
      </Modal>

      <Modal open={openDetails} onClose={handleCloseDetails} aria-labelledby="modal-modal-title">
        <Box sx={style3}>
          <div className="register w-1/2 h-96 ml-24">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {details && details.title}
            </Typography>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "20px", width: "100%", alignItems: "flex-start" }}>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Location : {details.location}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>
                Person Count : {details.minPersonCount} - {details.maxPersonCount}
              </span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Budget : {details.budget} P/P</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Event Date : {details.date}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Last Quote Date :{details.lastQuotationDate}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Industry :{details.industry}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Certification Required :{details.certificationRequired}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Specific Requirements :{details.specificRequirements}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Report Delivery :{details.reportDelivery}</span>
              <span style={{ fontSize: "18px", marginBottom: "10px" }}>Parameters Required :{details.parametersRequired}</span>
              {details.isQuotationAccepted && (
                <>
                  <span style={{ fontSize: "18px", marginBottom: "10px" }}>Vendor Name :{details.vendorDetails.username}</span>
                  <span style={{ fontSize: "18px", marginBottom: "10px" }}>Vendor Contact Number :{details.vendorDetails.contactNumber}</span>
                  <span style={{ fontSize: "18px", marginBottom: "10px" }}>Quotation : Rs {details.acceptedQuotationDetails.quotation}</span>
                </>
              )}
            </div>
            <div style={{ width: "100%", display: "flex", justifyContent: "center", marginTop: "20px" }}>
              {sessionUser?.role && sessionUser.role === "vendor" && (
                <span className="programsBox-button" onClick={() => handleOpen(details._id)}>
                  Quote Now
                </span>
              )}
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={openEdit} onClose={handleCloseEdit} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="register w-1/2 h-96 ml-24" style={{ overflowY: "scroll", overflowX: "hidden" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Program Details
            </Typography>
            <form onSubmit={handleSaveChanges}>
              <div style={{ width: "100%", display: "flex", marginLeft: "20px", marginTop: "20px" }}>
                <span>Select Program Title</span>
              </div>
              <select required={true} name="title" onChange={handleChange}>
                <option value="" disabled>
                  Select your option
                </option>
                {programTitles.map((e, index) =>
                  e.title === newProgram.title ? (
                    <option key={index} value={e.title} selected>
                      {e.title}
                    </option>
                  ) : (
                    <option key={index} value={e.title}>
                      {e.title}
                    </option>
                  )
                )}
              </select>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Budget</span>
              </div>
              <input type="text" required={true} name="budget" value={newProgram.budget} placeholder="Enter Budget" onChange={handleChange}></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Minimum Person Count</span>
              </div>
              <input
                type="number"
                required={true}
                name="minPersonCount"
                value={newProgram.minPersonCount}
                placeholder="Enter Person Count"
                onChange={handleChange}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Maximum Person Count</span>
              </div>
              <input
                type="number"
                required={true}
                name="maxPersonCount"
                value={newProgram.maxPersonCount}
                placeholder="Enter Person Count"
                onChange={handleChange}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Program Date</span>
              </div>
              <input type="date" required={true} name="date" value={newProgram.date} placeholder="Enter Program Date" onChange={handleChange}></input>

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
                <option value="" disabled>
                  Select your option
                </option>
                {State &&
                  State.getStatesOfCountry("IN").map((item) =>
                    item.name === newProgram.state ? (
                      <option key={item.name} value={item.name} selected>
                        {item.name}
                      </option>
                    ) : (
                      <option key={item.name} value={item.name}>
                        {item.name}
                      </option>
                    )
                  )}
              </select>

              {newProgram?.state && (
                <>
                  <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                    <span>Select City</span>
                  </div>
                  <select required={true} name="city" onChange={handleChange}>
                    <option value="" disabled>
                      Select your option
                    </option>
                    {City &&
                      City.getCitiesOfCountry("IN").map((item) =>
                        item.name === newProgram.city ? (
                          <option key={item.name} value={item.name} selected>
                            {item.name}
                          </option>
                        ) : (
                          <option key={item.name} value={item.name}>
                            {item.name}
                          </option>
                        )
                      )}
                  </select>
                </>
              )}
              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Enter Industry</span>
              </div>
              <input
                type="text"
                required={true}
                name="industry"
                placeholder="Enter Industry"
                value={newProgram.industry}
                onChange={handleChange}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Select Certification Required</span>
              </div>
              <select required={true} name="certificationRequired" onChange={handleChange}>
                <option value="" disabled>
                  Select your option
                </option>
                {certifications.map((e, index) =>
                  newProgram.certificationRequired === e.title ? (
                    <option key={index} value={e.title} selected>
                      {e.title}
                    </option>
                  ) : (
                    <option key={index} value={e.title}>
                      {e.title}
                    </option>
                  )
                )}
              </select>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Select Report Delivery</span>
              </div>
              <select required={true} name="reportDelivery" onChange={handleChange}>
                <option value="" disabled>
                  Select your option
                </option>

                {newProgram.reportDelivery === "Hard Copy" ? (
                  <option value="Hard Copy" selected>
                    Hard Copy
                  </option>
                ) : (
                  <option value="Hard Copy">Hard Copy</option>
                )}
                {newProgram.reportDelivery === "Soft Copy" ? (
                  <option value="Soft Copy" selected>
                    Soft Copy
                  </option>
                ) : (
                  <option value="Soft Copy">Soft Copy</option>
                )}
                {newProgram.reportDelivery === "Hard Copy & Soft Copy" ? (
                  <option value="Hard Copy & Soft Copy" selected>
                    Hard Copy & Soft Copy
                  </option>
                ) : (
                  <option value="Hard Copy & Soft Copy">Hard Copy & Soft Copy</option>
                )}
              </select>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Specific Requirements</span>
              </div>
              <input
                type="text"
                required={true}
                name="specificRequirements"
                placeholder="Specific Requirements..."
                value={newProgram.specificRequirements}
                onChange={handleChange}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Select Parameters Required</span>
              </div>
              <textarea
                className="textAreaAddProgram"
                required={true}
                name="parametersRequired"
                value={newProgram.parametersRequired}
                onChange={handleChange}
              ></textarea>

              <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">Save Changes</button>
            </form>
          </div>
        </Box>
      </Modal>

      <Modal open={openSpocDetails} onClose={handleCloseSpocDetails} aria-labelledby="modal-modal-title">
        <Box sx={style4}>
          <div className="register w-1/2 h-96 ml-24">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              SPOC Details
            </Typography>
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column" }}>
              {details?.isSpocDetailsSubmitted ? (
                <>
                  <span style={{ fontSize: "20px", fontWeight: "600", textAlign: "left" }}>
                    Name: <span style={{ fontWeight: "500" }}>{details?.spocDetails?.name}</span>
                  </span>

                  <span style={{ fontSize: "20px", fontWeight: "600", textAlign: "left" }}>
                    Email: <span style={{ fontWeight: "500" }}>{details?.spocDetails?.email}</span>
                  </span>

                  <span style={{ fontSize: "20px", fontWeight: "600", textAlign: "left" }}>
                    Contact Number: <span style={{ fontWeight: "500" }}>{details?.spocDetails?.contact}</span>
                  </span>
                </>
              ) : (
                <span style={{ fontSize: "20px", fontWeight: "600", textAlign: "left" }}>SPOC Details Not Submitted by the Vendor</span>
              )}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
