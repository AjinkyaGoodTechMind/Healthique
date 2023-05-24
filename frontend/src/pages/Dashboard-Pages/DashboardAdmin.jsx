import "./dashboard.css";

import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";

import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";

import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";

export default function DashboardAdmin() {
  const { sessionUser, loading } = useSelector((state) => state.sessionSlice);

  const [jobPosts, setJobPosts] = useState([]);

  const [reason, setReason] = useState("");

  const [postId, setPostId] = useState("");

  const [openDetails, setOpenDetails] = useState(false);

  const [openReject, setOpenReject] = useState(false);

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

  const style3 = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };

  const handleOpenDetails = (e) => {
    setDetails(e);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => setOpenDetails(false);

  const handleOpenReject = (e) => {
    setPostId(e);
    setOpenReject(true);
  };
  const handleCloseReject = () => {
    setOpenReject(false);
  };

  const getData = async () => {
    await axios
      .get(`/api/jobPosts/getPendingApprovalPosts`)
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

  const handleApprove = async (postId) => {
    await axios
      .put(`/api/jobPosts/updatePostApproval?postId=${postId}&updatedStatus=approved&reason=""`)
      .then(({ data }) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/jobPosts/updatePostApproval?postId=${postId}&updatedStatus=rejected&reason=${reason}`)
      .then(({ data }) => {
        getData();
        handleCloseReject();
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
        <Sidebar />
        <div className="dashboard-main">
          <FeaturedInfo />

          <div className="homeWidgets">
            <span className="widgetTitle">Pending Program Approvals</span>
            <div className="programsContainer">
              {jobPosts.slice(0, 5).map((e, index) => {
                return (
                  <div className="programsBox" key={index}>
                    <div className="programsBox-title-div">
                      <div style={{ display: "flex" }}>
                        <span className="programsBox-title">{e.title}</span>
                        <span style={{ marginLeft: "10px", color: "gray", fontWeight: "600", marginTop: "15px" }}>#{e.postId}</span>
                      </div>
                      <div className="programsBox-button-div" style={{ width: "400px" }}>
                        <span className="programsBox-button" onClick={() => handleOpenDetails(e)}>
                          View Details
                        </span>
                        <span className="programsBox-button" onClick={() => handleApprove(e._id)}>
                          Approve
                        </span>
                        <span className="programsBox-button" onClick={() => handleOpenReject(e._id)}>
                          Reject
                        </span>
                      </div>
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
            </div>
          </div>
        </Box>
      </Modal>

      <Modal open={openReject} onClose={handleCloseReject} aria-labelledby="modal-modal-title">
        <Box sx={style3}>
          <div className="register w-1/2 h-96 ml-24">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Rejection Reason
            </Typography>
            <form onSubmit={handleReject} style={{ marginTop: "20px" }}>
              <textarea
                type="text"
                required={true}
                name="quotation"
                value={reason}
                placeholder="Enter reason"
                onChange={(e) => setReason(e.target.value)}
              ></textarea>
              <button style={{ marginTop: "20px" }} className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">
                Reject
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
