import React from "react";
import "./about.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import Freelancer from "../../components/Freelancer/Freelancer";

const About = () => {
  return (
    <>
      <Navbar />
      <Freelancer />
      <div className="aboutMain">
        <h1 style={{ margin: "30px" }}>
          Welcome to <span style={{ color: "#d6193f" }}>Healthique !!!</span>
        </h1>
        <div className="aboutMain-inner">
          <h2>
            About <span style={{ color: "#d6193f" }}>Us</span>
          </h2>
          <p>
            <span style={{ fontWeight: "600" }}>Healthique</span> means <span style={{ fontWeight: "600" }}>Health + Unique,</span> which means Unique
            Health, Here we are India First Marketplace for Corporate Wellness and Healthcare Program, Where you can list your Wellness Program and
            Health Check (Annual, Pre Employement and Preventive).
          </p>
          <h2>
            Why <span style={{ color: "#d6193f" }}>Healthique ?</span>
          </h2>
          <p>
            <span style={{ fontWeight: "600" }}>Healthique</span> will provide transparency in your healthcare workshop and camps, we minimize your
            dependency on single source or vendor.
          </p>

          <h2>
            Growth By <span style={{ color: "#d6193f" }}>Healthique</span>
          </h2>
          <p>
            Up to <span style={{ fontWeight: "600" }}>30% Growth</span> can be done by just one listing. Healthique has done market research that a
            quotation for health camp of pre employment from Agreegrator to Direct Lab/Hospital, or Agreegrator to Agreegrator is upto 30% difference.
            By Listing which decrease the cost of Healthcheckup and increase the growth of company.
          </p>

          <h2>
            Network by <span style={{ color: "#d6193f" }}>Healthique</span>
          </h2>
          <p>
            You can cover all network in <span style={{ fontWeight: "600" }}>Pan India</span>, Just in one listing in Healthqiue, Our Vendor are from
            every corner of India, Which increase the network of our service area, also you can work in direct modal as compare to sub direct modal.
          </p>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default About;
