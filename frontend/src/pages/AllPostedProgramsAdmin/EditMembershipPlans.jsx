import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Box, Checkbox, FormControlLabel, Modal, Typography } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";

export default function EditMembershipPlans() {
  const [data, setData] = useState([]);

  const [planId, setPlanId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [monthlyPrice, setMonthlyPrice] = useState("");
  const [yearlyPrice, setYearlyPrice] = useState("");

  const [features, setFeatures] = useState([]);

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openDetails, setOpenDetails] = useState(false);

  const handleOpenDeails = (id) => {
    let current = data.filter((e) => e._id.toString() === id.toString());

    setPlanId(id);

    setTitle(current[0].title);
    setDescription(current[0].description);
    setMonthlyPrice(current[0].monthlyPrice);
    setYearlyPrice(current[0].yearlyPrice);
    setFeatures(current[0].features);

    setOpenDetails(true);
  };
  const handleCloseDetails = () => setOpenDetails(false);

  const style = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };

  const handleEdit = async (id) => {
    let current = data.filter((e) => e._id.toString() === id.toString());

    setPlanId(id);

    setTitle(current[0].title);
    setDescription(current[0].description);
    setMonthlyPrice(current[0].monthlyPrice);
    setYearlyPrice(current[0].yearlyPrice);
    setFeatures(current[0].features);

    handleOpen();
  };

  const getData = async () => {
    await axios
      .get(`/api/plans/getPlans`)
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

  const handlePost = async (e) => {
    e.preventDefault();

    await axios
      .put(`/api/plans/updatePlans`, { planId, title, description, monthlyPrice, yearlyPrice, features })
      .then(({ data }) => {
        getData();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendNewsleter = async (newsletterId) => {
    await axios
      .post(`/api/newsletter/sendNewsletter`, { newsletterId })
      .then(({ data }) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },

    {
      field: "description",
      headerName: "Description",
      width: 200,
    },

    {
      field: "monthlyPrice",
      headerName: "Monthly Price",
      width: 200,
    },

    {
      field: "yearlyPrice",
      headerName: "Yearly Price",
      width: 200,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="programsBox-button-div">
            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleOpenDeails(params.row._id)}
            >
              View
            </span>
            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </span>
          </div>
        );
      },
    },
  ];

  const handleFeatureChange = (i, index) => {
    let newData = features;

    newData[index] = i.target.value;

    setFeatures([...newData]);
  };

  const handleRemove = (index) => {
    let newData = features;

    newData.splice(index, 1);

    setFeatures([...newData]);
  };

  const handleAdd = () => {
    let newData = features;

    newData.push("");

    setFeatures([...newData]);
  };

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container ">
        <Sidebar />
        <div className="memberList">
          <h2>Edit Membership Plans</h2>
          {/* <span className="postNewProgramButton" style={{ width: "250px" }} onClick={handleOpen}>
            Add New
          </span> */}
          <DataGrid rows={data} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
        </div>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="register w-1/2 h-96 ml-24" style={{ overflowY: "scroll", overflowX: "hidden", width: "600px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Plan Details
            </Typography>
            <form onSubmit={handlePost} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Title</span>
              </div>
              <input type="text" required={true} value={title} onChange={(e) => setTitle(e.target.value)} style={{ width: "500px" }}></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Description</span>
              </div>
              <textarea
                type="text"
                required={true}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{ width: "500px" }}
              ></textarea>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Monthly Price</span>
              </div>
              <input
                type="number"
                required={true}
                value={monthlyPrice}
                onChange={(e) => setMonthlyPrice(e.target.value)}
                style={{ width: "500px" }}
              ></input>

              <div style={{ width: "100%", display: "flex", marginLeft: "20px" }}>
                <span>Yearly Price</span>
              </div>
              <input
                type="number"
                required={true}
                value={yearlyPrice}
                onChange={(e) => setYearlyPrice(e.target.value)}
                style={{ width: "500px" }}
              ></input>
              <span className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl " onClick={handleAdd}>
                Add Features
              </span>
              {features?.map((e, index) => {
                return (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <input
                      key={e._id}
                      type="text"
                      required={true}
                      value={e}
                      onChange={(i) => handleFeatureChange(i, index)}
                      style={{ width: "500px" }}
                    ></input>
                    <CancelIcon style={{ cursor: "pointer" }} onClick={() => handleRemove(index)} />
                  </div>
                );
              })}

              <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">Update</button>
            </form>
          </div>
        </Box>
      </Modal>

      <Modal open={openDetails} onClose={handleCloseDetails} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="register w-1/2 h-96 ml-24" style={{ overflowY: "scroll", overflowX: "hidden", width: "600px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Plan Details
            </Typography>
            <div style={{ display: "flex", flexDirection: "column", marginTop: "20px", width: "100%", alignItems: "flex-start" }}>
              <span style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "600" }}>
                Title : <span style={{ fontWeight: "400" }}>{title}</span>
              </span>
              <span style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "600", textAlign: "left" }}>
                Descripion : <span style={{ fontWeight: "400" }}>{description}</span>
              </span>
              <span style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "600" }}>
                Monthly Price : <span style={{ fontWeight: "400" }}>{monthlyPrice} Rs</span>
              </span>
              <span style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "600" }}>
                Yearly Price : <span style={{ fontWeight: "400" }}>{yearlyPrice} Rs</span>
              </span>
              <span style={{ fontSize: "18px", marginBottom: "10px", fontWeight: "600" }}>Features :</span>
              {features?.map((e, index) => {
                return (
                  <span key={index} style={{ fontSize: "18px", marginBottom: "10px" }}>
                    {index + 1}. {e}
                  </span>
                );
              })}
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
