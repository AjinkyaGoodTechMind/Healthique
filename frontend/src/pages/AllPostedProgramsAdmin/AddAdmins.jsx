import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Box, Checkbox, FormControlLabel, Modal, Typography } from "@mui/material";

export default function AddAdmins() {
  const [data, setData] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };
  const handleEdit = (id) => {};

  const handleDelete = async (id) => {
    await axios
      .put(`/api/newsletter/deleteNewsletter`, { id })
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getData = async () => {
    await axios
      .get(`/api/admin/getAdmins`)
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
      .post(`/api/admin/addAdmin`, { email, username, password, contactNumber })
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
      field: "username",
      headerName: "Username",
      width: 200,
    },

    {
      field: "email",
      headerName: "Email",
      width: 200,
    },

    {
      field: "contactNumber",
      headerName: "Contact No",
      width: 200,
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="programsBox-button-div">
            {/* <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </span> */}
            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </span>
          </div>
        );
      },
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container ">
        <Sidebar />
        <div className="memberList">
          <h2>Create Admins</h2>
          <span className="postNewProgramButton" style={{ width: "250px" }} onClick={handleOpen}>
            Add New
          </span>
          <DataGrid rows={data} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
        </div>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="register w-1/2 h-96 ml-24" style={{ overflowY: "scroll", overflowX: "hidden", width: "600px" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Details
            </Typography>
            <form onSubmit={handlePost} style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
              <input
                type="text"
                required={true}
                value={username}
                placeholder="Enter Username"
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "500px" }}
              ></input>
              <input
                type="text"
                required={true}
                value={email}
                placeholder="Enter Email"
                onChange={(e) => setEmail(e.target.value)}
                style={{ width: "500px" }}
              ></input>
              <input
                type="number"
                required={true}
                value={contactNumber}
                placeholder="Enter Contact Number"
                onChange={(e) => setContactNumber(e.target.value)}
                style={{ width: "500px" }}
              ></input>
              <input
                type="password"
                required={true}
                value={password}
                placeholder="Enter Password"
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: "500px" }}
              ></input>

              <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">Post</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
