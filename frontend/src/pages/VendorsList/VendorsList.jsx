import "./memberList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

export default function VendorsList() {
  const [data, setData] = useState([]);

  const [plans, setPlans] = useState([]);

  const [subscriptions, setSubscripions] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const getData = async () => {
    await axios
      .get(`/api/admin/adminVendorData`)
      .then(({ data }) => {
        console.log(data);
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`/api/plans/getPlans`)
      .then(({ data }) => {
        setPlans(data);
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`/api/plans/getSubscriptionAdmin`)
      .then(({ data }) => {
        setSubscripions(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    { field: "userId", headerName: "Vendor Id", width: 200 },
    {
      field: "username",
      headerName: "Vendor Name",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 150,
    },
    {
      field: "activePlan",
      headerName: "Current Plan",
      width: 100,
      renderCell: (params) => {
        let sub = subscriptions.filter((e) => e.userId.toString() === params.row._id.toString());

        if (sub.length) {
          let plan = plans.filter((e) => e._id.toString() === sub[0].planId.toString());

          return <span>{plan[0]?.title}</span>;
        }
      },
    },
    {
      field: "planStatus",
      headerName: "Plan Status ",
      width: 100,
      renderCell: (params) => {
        let sub = subscriptions.filter((e) => e.userId.toString() === params.row._id.toString());

        return <span style={sub[0]?.status === "Active" ? { color: "green" } : { color: "Red" }}>{sub[0]?.status}</span>;
      },
    },
    {
      field: "planExpire",
      headerName: "Plan Expire Date",
      width: 150,
      renderCell: (params) => {
        let sub = subscriptions.filter((e) => e.userId.toString() === params.row._id.toString());

        return <span>{moment(sub[0]?.expireDate).format("DD/MM/YYYY")}</span>;
      },
    },
    {
      field: "createdAt",
      headerName: "Date Of Joining",
      width: 250,
      valueFormatter: (params) => moment(params?.value).format("DD/MM/YYYY hh:mm A"),
    },
    // {
    //   field: "action",
    //   headerName: "Action",
    //   width: 150,
    //   renderCell: (params) => {
    //     return (
    //       <>
    //         <Link to={"/member/" + params.row.id}>
    //           <button className="userListEdit">Edit</button>
    //         </Link>
    //         <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row.id)} />
    //       </>
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
          <h2>Vendors</h2>
          <DataGrid rows={data} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
        </div>
      </div>
    </div>
  );
}
