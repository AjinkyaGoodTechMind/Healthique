import "./featuredInfo.css";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function FeaturedInfoVendor() {
  const [data, setData] = useState({
    postedQuotationsCount: 0,
    acceptedQuotationsCount: 0,
    pendingQuotationsCount: 0,
  });

  const getFeaturedInfo = async () => {
    await axios
      .get(`/api/vendor/vendorFeaturedInfo`)
      .then(({ data }) => {
        setData({ ...data });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getFeaturedInfo();
  }, []);

  return (
    <div className="featured" style={{ marginBottom: "30px" }}>
      <Link to="/dashboard" className="featuredItem" style={{ backgroundColor: "#00b6d1" }}>
        <span className="featuredTitle">Total Quotations Posted</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.postedQuotationsCount}</span>
        </div>
      </Link>

      <Link to="/referencesIncentiveHistory" className="featuredItem" style={{ backgroundColor: "#53A743" }}>
        <span className="featuredTitle">Accepted Quotations</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.acceptedQuotationsCount}</span>
        </div>
      </Link>

      <Link to="/nonWorkingPlanIncentiveHistory" className="featuredItem" style={{ backgroundColor: "#FFC207" }}>
        <span className="featuredTitle">Pending Quotations</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.pendingQuotationsCount}</span>
        </div>
      </Link>

      <Link to="/referredMembers" className="featuredItem" style={{ backgroundColor: "#DB3644" }}>
        <span className="featuredTitle">Active Plan</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">Gold Plan</span>
        </div>
      </Link>
    </div>
  );
}
