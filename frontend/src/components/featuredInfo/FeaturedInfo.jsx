import "./featuredInfo.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FeaturedInfo() {
  const [data, setData] = useState({
    vendorCount: 0,
    customerCount: 0,
    postedProgramsCount: 0,
    pendingApprovalsCount: 0,
  });

  const getFeaturedInfo = async () => {
    await axios
      .get(`/api/admin/adminFeaturedInfo`)
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
        <span className="featuredTitle">Total Programs Posted</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.postedProgramsCount}</span>
        </div>
      </Link>

      <Link to="/referencesIncentiveHistory" className="featuredItem" style={{ backgroundColor: "#53A743" }}>
        <span className="featuredTitle">Total Vendors</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.vendorCount}</span>
        </div>
      </Link>

      <Link to="/nonWorkingPlanIncentiveHistory" className="featuredItem" style={{ backgroundColor: "#FFC207" }}>
        <span className="featuredTitle">Total Customers</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.customerCount}</span>
        </div>
      </Link>

      <Link to="/referredMembers" className="featuredItem" style={{ backgroundColor: "#DB3644" }}>
        <span className="featuredTitle">Pending Approvals</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">{data.pendingApprovalsCount}</span>
        </div>
      </Link>
    </div>
  );
}
