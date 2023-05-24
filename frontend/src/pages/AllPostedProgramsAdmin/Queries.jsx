import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { Box, Checkbox, FormControlLabel, Modal, Typography } from "@mui/material";

export default function Queries() {
  const [data, setData] = useState([]);

  const getData = async () => {
    await axios
      .get(`/api/admin/getQueries`)
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

  const columns = [
    {
      field: "name",
      headerName: "Name",
      width: 200,
    },

    {
      field: "email",
      headerName: "Email",
      width: 200,
    },

    {
      field: "subject",
      headerName: "Subject",
      width: 400,
    },

    {
      field: "message",
      headerName: "Message",
      width: 500,
    },

    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <div className="programsBox-button-div">

    //         <span
    //           style={{ border: "1px solid #d6193f", padding: "5px", borderRadius: "10px", cursor: "pointer" }}
    //           onClick={() => handleDelete(params.row._id)}
    //         >
    //           Delete
    //         </span>
    //       </div>
    //     );
    //   },
    // },
  ];

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container ">
        <Sidebar />
        <div className="memberList">
          <h2>Queries</h2>

          <DataGrid rows={data} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
        </div>
      </div>
    </div>
  );
}
