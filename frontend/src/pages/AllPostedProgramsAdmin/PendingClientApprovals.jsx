import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

export default function PendingClientApprovals() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

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

  const columns = [
    { field: "_id", headerName: "ID", width: 200 },
    {
      field: "title",
      headerName: "Title",
      width: 200,
    },
    { field: "location", headerName: "Location", width: 200 },
    {
      field: "budget",
      headerName: "Budget",
      width: 100,
    },
    {
      field: "personCount",
      headerName: "Person Count",
      width: 100,
    },
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
      width: 150,
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
          <h2>Pending Program Approvals</h2>
          <DataGrid rows={data} getRowId={(row) => row._id} columns={columns} pageSize={10} />
        </div>
      </div>
    </div>
  );
}
