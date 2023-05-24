import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../../components/Navbar/Navbar";
import axios from "axios";
import { Box, Modal, Typography } from "@mui/material";

export default function NewsletterEmails() {
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .get(`/api/newsletter/getEmails`)
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

  const deleteEmail = async (email) => {
    await axios
      .put(`/api/newsletter/deleteEmail`, { email })
      .then(({ data }) => {
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const columns = [
    {
      field: "email",
      headerName: "Email",
      width: 300,
    },

    {
      field: "role",
      headerName: "User Type",
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
              onClick={() => deleteEmail(params.row.email)}
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
          <h2>Newsletter Emails</h2>
          {/* <span className="postNewProgramButton" style={{ width: "250px" }} onClick={handleOpen}>
            Post New Certification
          </span> */}
          <DataGrid rows={data} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
        </div>
      </div>
    </div>
  );
}
