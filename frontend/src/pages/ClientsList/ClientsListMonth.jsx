import "./memberList.css";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";

export default function ClientsListMonth() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const getData = async () => {
    await axios
      .get(`/api/admin/adminCustomerData`)
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
    { field: "userId", headerName: "Client Id", width: 300 },
    {
      field: "username",
      headerName: "Client Name",
      width: 200,
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "contactNumber",
      headerName: "Contact Number",
      width: 200,
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
          <h2>New Clients This Month</h2>
          <DataGrid rows={data} getRowId={(row) => row._id} disableSelectionOnClick columns={columns} pageSize={10} checkboxSelection />
        </div>
      </div>
    </div>
  );
}
