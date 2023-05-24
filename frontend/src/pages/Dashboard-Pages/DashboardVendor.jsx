import "./dashboard.css";

import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import ReferencesIncentiveTable from "../../components/incentiveTables/ReferencesIncentiveTable";
import WidgetSm from "../../components/widgetSm/WidgetSm";

import Loader from "../../components/Loader/Loader";
import { useSelector } from "react-redux";

import Sidebar from "../../components/sidebar/Sidebar";
import SidebarVendor from "../../components/sidebar/SidebarVendor";
import SidebarCustomer from "../../components/sidebar/SidebarCustomer";

import Navbar from "../../components/Navbar/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import FeaturedInfoVendor from "../../components/featuredInfo/FeaturedInfoVendor";

export default function DashboardVendor() {
  const { loading } = useSelector((state) => state.userSlice);
  const { sessionUser } = useSelector((state) => state.sessionSlice);

  const [bids, setBids] = useState([]);

  const getData = async () => {
    await axios
      .get(`/api/bids/getBidsVendor`)
      .then(({ data }) => {
        console.log(data);
        setBids(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="dashboard-wrapper">
      <Navbar />
      <div className="dashboard-container">
        <SidebarVendor />
        <div className="dashboard-main">
          <FeaturedInfoVendor />
          <div className="homeWidgets">
            <div style={{ display: "flex" }}>
              <div className="widgetLg">
                <h3 className="widgetSmTitle">Accepted Quotations</h3>
                <ul className="widgetSmList">
                  <table className="widgetLgTable">
                    <tr className="widgetLgTr">
                      <th className="widgetLgTh">Customer Name</th>
                      <th className="widgetLgTh">Quotation</th>
                      <th className="widgetLgTh">Date</th>
                      <th className="widgetLgTh">Status</th>
                    </tr>
                    {bids.map((e, index) => {
                      return (
                        e.status === "accepted" && (
                          <tr className="widgetLgTr" key={index}>
                            <td className="widgetLgUser">
                              <span className="widgetLgName">Customer1</span>
                            </td>
                            <td className="widgetLgAmount">Rs {e.quotation} per person</td>
                            <td className="widgetLgDate">{moment(e.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                            <td className="widgetLgAmount">{e.status}</td>
                          </tr>
                        )
                      );
                    })}
                  </table>
                </ul>
              </div>
              <div className="widgetLg">
                <h3 className="widgetSmTitle">Pending & Rejected Quotations</h3>
                <ul className="widgetSmList">
                  <table className="widgetLgTable">
                    <tr className="widgetLgTr">
                      <th className="widgetLgTh">Customer Name</th>
                      <th className="widgetLgTh">Quotation</th>
                      <th className="widgetLgTh">Date</th>
                      <th className="widgetLgTh">Status</th>
                    </tr>
                    {bids.map((e, index) => {
                      return (
                        e.status !== "accepted" && (
                          <tr className="widgetLgTr" key={index}>
                            <td className="widgetLgUser">
                              <span className="widgetLgName">Customer1</span>
                            </td>
                            <td className="widgetLgAmount">Rs {e.quotation} per person</td>
                            <td className="widgetLgDate">{moment(e.createdAt).format("DD/MM/YYYY hh:mm A")}</td>
                            <td className="widgetLgAmount">{e.status}</td>
                          </tr>
                        )
                      );
                    })}
                  </table>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
