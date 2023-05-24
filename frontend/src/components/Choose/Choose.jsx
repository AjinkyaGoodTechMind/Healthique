import React, { useEffect, useState } from "react";
import image1 from "../../assets/images/preEmployementImage.jpeg";
import image2 from "../../assets/images/annualHealthImage.jpeg";
import image3 from "../../assets/images/annualHealthImage2.jpeg";
import image4 from "../../assets/images/healthCheckupImage.jpg";
import image5 from "../../assets/images/image5.png";
import image6 from "../../assets/images/image6.png";
import image7 from "../../assets/images/image7.png";
import image8 from "../../assets/images/image8.png";
import "./Choose.css";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { setTitle } from "../../slices/searchSlice";
import axios from "axios";

const Choose = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState([]);

  const handleSearch = (e) => {
    dispatch(setTitle(e));
    navigate("/allPostedPrograms");
  };

  const getData = async () => {
    await axios
      .get(`/api/admin/getProgramTitles`)
      .then(({ data }) => {
        setData(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="chooseMain">
        <h1 style={{ marginTop: "50px", textAlign: "center" }}>
          Popular <span style={{ color: "#d6193f" }}>Categories</span>
        </h1>
        <div className="choosediv">
          {data?.slice(0, 4).map((e) => {
            return (
              <div key={e._id} className="imgdiv" onClick={() => handleSearch(e.title)}>
                <img className="chooseDivImage" src={e.image} alt="" />
                <h4 className="chooseDivText">{e.title}</h4>
              </div>
            );
          })}
        </div>
        <div className="choosediv">
          {data?.slice(5, 9).map((e) => {
            return (
              <div key={e._id} className="imgdiv" onClick={() => handleSearch(e.title)}>
                <img className="chooseDivImage" src={e.image} alt="" />
                <h4 className="chooseDivText">{e.title}</h4>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Link className="btntag2" to="/allPostedPrograms">
          More
        </Link>
      </div>
    </div>
  );
};

export default Choose;
