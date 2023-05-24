import React from "react";
import image1 from "../../assets/images/cityImage.jpeg";
import image2 from "../../assets/images/cityImage2.jpg";
import image3 from "../../assets/images/cityImage.jpeg";
import image4 from "../../assets/images/cityImage2.jpg";
import { setLocation } from "../../slices/searchSlice";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const PopularCities = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    dispatch(setLocation(e));
    navigate("/allPostedPrograms");
  };

  return (
    <div>
      <div className="chooseMain">
        <h1 style={{ marginTop: "50px", textAlign: "center" }}>
          Popular <span style={{ color: "#d6193f" }}>Cities</span>
        </h1>
        <div className="choosediv">
          <div className="imgdiv" onClick={() => handleSearch("Delhi")}>
            <img className="chooseDivImage" src={image1} alt="" />
            <h4 className="chooseDivText">Delhi</h4>
          </div>
          <div className="imgdiv" onClick={() => handleSearch("Mumbai")}>
            <img className="chooseDivImage" src={image2} alt="" />
            <h4 className="chooseDivText">Mumbai</h4>
          </div>
          <div className="imgdiv" onClick={() => handleSearch("Chennai")}>
            <img className="chooseDivImage" src={image3} alt="" />
            <h4 className="chooseDivText">Chennai</h4>
          </div>
          <div className="imgdiv" onClick={() => handleSearch("kolkata")}>
            <img className="chooseDivImage" src={image4} alt="" />
            <h4 className="chooseDivText">Kolkata</h4>
          </div>
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

export default PopularCities;
