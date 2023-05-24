import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "axios";
import { Box, Checkbox, FormControlLabel, Modal, Typography } from "@mui/material";

export default function SendNewsletter() {
  const [data, setData] = useState([]);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [customer, setCustomer] = useState(false);
  const [vendor, setVendor] = useState(false);
  const [unregisered, setUnregisered] = useState(false);

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
      .get(`/api/newsletter/getNewsletters`)
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

    let selectedRoles = [];

    if (customer) {
      selectedRoles.push("customer");
    }

    if (vendor) {
      selectedRoles.push("vendor");
    }

    if (unregisered) {
      selectedRoles.push("unregistered");
    }

    await axios
      .post(`/api/newsletter/postNewsletter`, { subject, body, selectedRoles })
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
      field: "subject",
      headerName: "Subject",
      width: 300,
    },

    {
      field: "body",
      headerName: "Body",
      width: 300,
    },

    {
      field: "selecedRoles",
      headerName: "Roles Seleced",
      width: 200,
      renderCell: (params) => {
        let selectedRoles = params?.row?.selectedRoles;
        return (
          <div style={{ display: "flex", flexDirection: "column" }}>
            {selectedRoles?.map((e, index) => {
              return <span key={index}>{e}</span>;
            })}
          </div>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="programsBox-button-div">
            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => sendNewsleter(params.row._id)}
            >
              Send
            </span>
            <span
              style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
              onClick={() => handleEdit(params.row._id)}
            >
              Edit
            </span>
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
          <h2>Send Newsletters</h2>
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
              <FormControlLabel
                control={<Checkbox onChange={(e) => setCustomer(e.target.checked)} />}
                label="Send to Customers"
                labelPlacement="start"
              />
              <FormControlLabel control={<Checkbox onChange={(e) => setVendor(e.target.checked)} />} label="Send to Vendors" labelPlacement="start" />
              <FormControlLabel
                control={<Checkbox onChange={(e) => setUnregisered(e.target.checked)} />}
                label="Send to Unregistered Users"
                labelPlacement="start"
              />
              <input
                type="text"
                required={true}
                value={subject}
                placeholder="Enter Subject"
                onChange={(e) => setSubject(e.target.value)}
                style={{ width: "500px" }}
              ></input>
              <textarea
                type="text"
                required={true}
                value={body}
                placeholder="Enter Body"
                onChange={(e) => setBody(e.target.value)}
                style={{ width: "500px" }}
              ></textarea>

              <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">Post</button>
            </form>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
