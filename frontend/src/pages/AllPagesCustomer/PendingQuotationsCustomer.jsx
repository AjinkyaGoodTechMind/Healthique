import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import moment from "moment";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import SidebarVendor from "../../components/sidebar/SidebarVendor";
import SidebarCustomer from "../../components/sidebar/SidebarCustomer";

export default function PendingQuotationsCustomer() {
  const [data, setData] = useState([]);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const getData = async () => {
    await axios
      .get(`/api/customer/pendingQuotations`)
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
      field: "postId2",
      headerName: "Post Id",
      width: 300,
    },
    { field: "vendorId2", headerName: "Vendor id", width: 300 },
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
          <h2>Pending Quotations</h2>
          <DataGrid rows={data} getRowId={(row) => row._id} columns={columns} pageSize={10} />
        </div>
      </div>
    </div>
  );
}
