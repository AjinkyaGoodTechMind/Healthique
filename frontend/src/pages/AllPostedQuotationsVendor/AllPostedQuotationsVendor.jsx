import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import SidebarVendor from "../../components/sidebar/SidebarVendor";
import { Box, Modal, Typography } from "@mui/material";

export default function AllPostedQuotationsVendor() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [quotationId, setQuotationId] = useState("");
  const [quotations, setQuotations] = useState([]);
  const [newSpocName, setNewSpocName] = useState("");
  const [newSpocContact, setNewSpocContact] = useState("");
  const [newSpocEmail, setNewSpocEmail] = useState("");
  const [openSubmitSpoc, setOpenSubmitSpoc] = useState(false);
  const [openSpocDetails, setOpenSpocDetails] = useState(false);
  const [postId, setPostId] = useState("");
  const [newQuotation, setNewQuotation] = useState("");
  const [openQuotations, setOpenQuotations] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  console.log(data2);
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
    personCount: "",
    lastQuotationDate: "",
  });

  const handleOpenDetails = (id) => {
    console.log(id);
    const post = data2.filter((e) => e._id.toString() === id.toString());
    console.log(post);
    if (post.length) {
      setDetails(post[0]);
      setOpenDetails(true);
    }
  };
  const handleCloseDetails = () => setOpenDetails(false);

  const handleOpenQuotations = async (quotationId) => {
    setQuotationId(quotationId);
    setOpenQuotations(true);
  };

  const handleCloseQuotations = () => setOpenQuotations(false);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const style2 = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
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

  const getData = async () => {
    await axios
      .get(`/api/vendor/allPostedQuotations`)
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`/api/jobPosts/getAllPosts`)
      .then(({ data }) => {
        console.log(data);
        setData2(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const edit = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/bids/editBid`, { newQuotation, quotationId })
      .then(({ data }) => {
        getData();
        handleCloseQuotations();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    // { field: "_id", headerName: "ID", width: 300 },
    {
      field: "postId2",
      headerName: "Post Id",
      width: 300,
    },
    {
      field: "quotation",
      headerName: "Quotation",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
    },
    {
      field: "action",
      headerName: "Action",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="programsBox-button-div">
            {/* <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleOpenDetails(params.row.postId)}
            >
              View Details
            </span> */}
            {params.row.status !== "accepted" && (
              <span
                style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
                onClick={() => handleOpenQuotations(params.row._id)}
              >
                Edit Quotation
              </span>
            )}
            {/* {params.row.status === "accepted" && (
              <span
                style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
                onClick={() => handleOpenQuotations(params.row._id)}
              >
                SPOC Details
              </span>
            )} */}
          </div>
        );
      },
    },
  ];

  const handleOpenSubmitSpoc = (id) => {
    setPostId(id);
    setOpenSubmitSpoc(true);
  };

  const handleCloseSubmitSpoc = () => {
    setOpenSubmitSpoc(false);
  };

  const submitSpoc = async (e) => {
    e.preventDefault();
    await axios
      .put(`/api/jobPosts/submitSpoc`, { newSpocName, newSpocContact, postId, newSpocEmail })
      .then(({ data }) => {
        getData();
        handleCloseSubmitSpoc();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container ">
        <SidebarVendor />
        <div className="memberList">
          <h2>All Posted Quotations</h2>
          <DataGrid rows={data} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
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
          </div>
        </Box>
      </Modal>

      <Modal open={openQuotations} onClose={handleCloseQuotations} aria-labelledby="modal-modal-title">
        <Box sx={style2}>
          <div className="register w-1/2 h-96 ml-24">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter New Quotation
            </Typography>
            <form onSubmit={edit} style={{ marginTop: "20px" }}>
              <input
                type="text"
                required={true}
                name="quotation"
                value={newQuotation}
                placeholder="Enter Quotation Per Person"
                onChange={(e) => setNewQuotation(e.target.value)}
              ></input>
              <button style={{ marginTop: "20px" }} className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">
                Post
              </button>
            </form>
          </div>
        </Box>
      </Modal>

      <Modal open={openSubmitSpoc} onClose={handleCloseSubmitSpoc} aria-labelledby="modal-modal-title">
        <Box sx={style4}>
          <div className="register w-1/2 h-96 ml-24">
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Submit SPOC Details
            </Typography>
            <form onSubmit={submitSpoc} style={{ marginTop: "20px" }}>
              <input
                type="text"
                required={true}
                value={newSpocName}
                placeholder="Enter Name"
                onChange={(e) => setNewSpocName(e.target.value)}
              ></input>
              <input
                type="text"
                required={true}
                value={newSpocEmail}
                placeholder="Enter Email"
                onChange={(e) => setNewSpocEmail(e.target.value)}
              ></input>
              <input
                type="text"
                required={true}
                value={newSpocContact}
                placeholder="Enter Contact Number"
                onChange={(e) => setNewSpocContact(e.target.value)}
              ></input>
              <button style={{ marginTop: "20px" }} className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">
                Submit
              </button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
