import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";
import { City, State } from "country-state-city";

export default function PendingApprovalProgramsAdmin() {
  const [data, setData] = useState([]);
  const [postId, setPostId] = useState("");
  const [openEdit, setOpenEdit] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [programTitles, setProgramTitles] = useState([]);

  const [certifications, setCertifications] = useState([]);

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

  const style3 = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
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

  const getData = async () => {
    await axios
      .get(`/api/jobPosts/getPendingApprovalPosts`)
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const handleApprove = async (postId) => {
    console.log(postId);
    await axios
      .put(`/api/jobPosts/updatePostApproval?postId=${postId}&updatedStatus=approved`)
      .then(({ data }) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleReject = async (postId) => {
    await axios
      .put(`/api/jobPosts/updatePostApproval?postId=${postId}&updatedStatus=rejected`)
      .then(({ data }) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProgram({
      ...newProgram,
      [name]: value,
    });
  };

  const handleOpenDetails = (id) => {
    const post = data.filter((e) => e._id.toString() === id.toString());

    setDetails(post[0]);
    setOpenDetails(true);
  };
  const handleCloseDetails = () => setOpenDetails(false);

  const columns = [
    { field: "postId", headerName: "Post Id", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    { field: "location", headerName: "Location", width: 200 },

    {
      field: "date",
      headerName: "Event Date",
      width: 150,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY "),
    },
    {
      field: "lastQuotationDate",
      headerName: "Last Quotation Date",
      width: 150,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY "),
    },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      width: 150,
    },
    {
      field: "action",
      headerName: "Action",
      width: 300,
      renderCell: (params) => {
        return (
          <div className="programsBox-button-div">
            {console.log(params)}
            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleApprove(params.row._id)}
            >
              Approve
            </span>
            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleReject(params.row._id)}
            >
              Reject
            </span>
            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleOpenDetails(params.row._id)}
            >
              View Details
            </span>

            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleOpenEdit(params.row)}
            >
              Edit
            </span>
          </div>
        );
      },
    },
  ];

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

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container ">
        <Sidebar />
        <div className="memberList">
          <h2>Pending Program Approvals</h2>
          <DataGrid rows={data} getRowId={(row) => row._id} columns={columns} pageSize={10} />
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
    </div>
  );
}
