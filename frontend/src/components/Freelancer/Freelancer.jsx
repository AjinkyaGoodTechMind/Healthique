import React, { useEffect, useState } from "react";
import working from "../../assets/hero1.PNG";

import "./Freelancer.css";
import { useDispatch, useSelector } from "react-redux";
import { setDate, setLocation } from "../../slices/searchSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Freelancer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [image, setImage] = useState("");

  const [counter, setCounter] = useState(false);

  const { location, date } = useSelector((state) => state.searchSlice);

  const getHero = async () => {
    await axios
      .get(`/api/admin/getHero`)
      .then(({ data }) => {
        setImage(data.image);
        setCounter(data.counter);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getHero();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate("/allPostedPrograms");
  };

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
    <div>
      <div className="hero" style={{ backgroundImage: `url(${image})`, width: "100%", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <div className="FreelanceDiv">
          <div className="heroMain">
            <div className="whenWhere-div">
              <span className="when">Where?</span>
              <span className="when2">When?</span>
            </div>

            <form className="example" onSubmit={handleSearch}>
              <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
                <input
                  type="text"
                  placeholder="Location"
                  value={location}
                  className="searchInputs"
                  style={{ borderRight: "1px solid grey" }}
                  onChange={(e) => dispatch(setLocation(e.target.value))}
                />
              </div>
              <div style={{ width: "40%", display: "flex", flexDirection: "column" }}>
                <input
                  value={date}
                  type="date"
                  placeholder="Event Date"
                  className="searchInputs"
                  onChange={(e) => dispatch(setDate(e.target.value))}
                />
              </div>

              <button type="submit">
                <i className="fa fa-search"></i>
              </button>
            </form>
            {counter ? (
              <>
                <span className="postedCount">{data.postedProgramsCount}</span>
                <span style={{ color: "gray" }}>Programs Posted</span>
              </>
            ) : null}
          </div>
          <div style={{ display: "flex", flexDirection: "column", width: "50%" }}></div>
        </div>
      </div>
    </div>
  );
};

export default Freelancer;
