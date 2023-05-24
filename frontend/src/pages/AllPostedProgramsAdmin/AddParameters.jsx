import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";

export default function AddParameters() {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");

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

  const getData = async () => {
    await axios
      .get(`/api/admin/getCertifications`)
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

  const handleDelete = async (id) => {
    await axios
      .put(`/api/admin/deleteCertification`, { id })
      .then(({ data }) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addTitles = async (e) => {
    e.preventDefault();
    await axios
      .post(`/api/admin/addCertification`, { title })
      .then(({ data }) => {
        getData();
        handleClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      field: "title",
      headerName: "Title",
      width: 500,
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
          <h2>Added Certifications</h2>
          <span className="postNewProgramButton" style={{ width: "250px" }} onClick={handleOpen}>
            Post New Certification
          </span>
          <DataGrid rows={data} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
        </div>
      </div>
      <Modal open={open} onClose={handleClose} aria-labelledby="modal-modal-title">
        <Box sx={style}>
          <div className="register w-1/2 h-96 ml-24" style={{ overflowY: "scroll", overflowX: "hidden" }}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Enter Certification Name
            </Typography>
            <form onSubmit={addTitles}>
              <input type="text" required={true} value={title} placeholder="Enter Title" onChange={(e) => setTitle(e.target.value)}></input>
              <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">Post</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
