import React from "react";
import Rectangle from "../../assets/images/Rectangle.png";
import unsplash1 from "../../assets/images/unsplash1 (1).png";
import unsplash2 from "../../assets/images/unsplash1 (1).png";
import Rectangle32 from "../../assets/images/Rectangle 32.png";
import Rectangle33 from "../../assets/images/Rectangle 33.png";
import Rectangle34 from "../../assets/images/Rectangle 34.png";
import "./Portfolios.css";

const Portfolios = () => {
  return (
    <div>
      <div style={{ marginLeft: "100px", marginTop: "100px", textAlign: "center" }}>
        <p style={{ color: "#9D9D9D" }}>Logos, websites, book covers & more!</p>
        <h2>
          Checkout The Best <span style={{ color: "#1E88E5" }}>Portfolios</span>Here
        </h2>
        <div className="Portfoliosmaindiv">
          <div className="Portfoliosdiv">
            <img src={Rectangle} alt="" style={{ width: "250px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", paddingLeft: "10px", paddingRight: "10px" }}>
              <div>
                <h5>Bunny.design</h5>
                <p>UI/UX Designer</p>
              </div>
              <div>
                <i className="fa fa-arrow-right" style={{ color: "#739add", fontSize: "25px" }}></i>
              </div>
            </div>
          </div>
          <div className="Portfoliosdiv">
            <img src={unsplash1} alt="" style={{ width: "250px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", paddingLeft: "10px", paddingRight: "10px" }}>
              <div>
                <h5>Bunny.design</h5>
                <p>UI/UX Designer</p>
              </div>
              <div>
                <i className="fa fa-arrow-right" style={{ color: "#739add", fontSize: "25px" }}></i>
              </div>
            </div>
          </div>
          <div className="Portfoliosdiv">
            <img src={unsplash2} alt="" style={{ width: "250px" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "15px", paddingLeft: "10px", paddingRight: "10px" }}>
              <div>
                <h5>Bunny.design</h5>
                <p>UI/UX Designer</p>
              </div>
              <div>
                <i className="fa fa-arrow-right" style={{ color: "#739add", fontSize: "25px" }}></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "50px", marginLeft: "40px", textAlign: "center" }}>
        <img src={Rectangle32} alt="" style={{ paddingLeft: "10px" }} />
        <img src={Rectangle33} alt="" style={{ paddingLeft: "10px" }} />
        <img src={Rectangle34} alt="" style={{ paddingLeft: "10px" }} />
      </div>
    </div>
  );
};

export default Portfolios;
