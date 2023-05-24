import React from "react";

const HeadDashboard = () => {
  return (
    <>
      <section className="head">
        <div className="container flexSB">
          <div className="logo" style={{ color: "black" }}>
            <h1>Aim Time Marketing</h1>
            {/* <span>ONLINE EDUCATION & LEARNING</span> */}
          </div>

          <div className="social">
            <i className="fab fa-facebook-f icon"></i>
            <i className="fab fa-instagram icon"></i>
            <i className="fab fa-twitter icon"></i>
            <i className="fab fa-youtube icon"></i>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeadDashboard;
