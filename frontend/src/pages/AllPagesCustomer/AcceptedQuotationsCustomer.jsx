import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import SidebarVendor from "../../components/sidebar/SidebarVendor";
import SidebarCustomer from "../../components/sidebar/SidebarCustomer";

export default function AcceptedQuotationsCustomer() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const getData = async () => {
    await axios
      .get(`/api/customer/acceptedQuotations`)
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
    { field: "_id", headerName: "ID", width: 300 },
    {
      field: "postId",
      headerName: "Post Id",
      width: 300,
    },
    {
      field: "quotation",
      headerName: "Quotation",
      width: 300,
    },
    {
      field: "status",
      headerName: "Status",
      width: 300,
    },
  ];

  return (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container ">
        <SidebarCustomer />
        <div className="memberList">
          <h2>Accepted Quotations</h2>
          <DataGrid rows={data} getRowId={(row) => row._id} columns={columns} pageSize={10} />
        </div>
      </div>
    </div>
  );
}
