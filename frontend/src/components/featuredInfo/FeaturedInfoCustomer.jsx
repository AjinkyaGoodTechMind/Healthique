import "./featuredInfo.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function FeaturedInfoCustomer() {
  const [data, setData] = useState({
    totalQuotationsCount: 0,
    acceptedQuotationsCount: 0,
    pendingQuotationsCount: 0,
  });

  const getFeaturedInfo = async () => {
    await axios
      .get(`/api/customer/customerFeaturedInfo`)
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
          <span className="featuredMoney">{data.totalQuotationsCount}</span>
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
    </div>
  );
}
