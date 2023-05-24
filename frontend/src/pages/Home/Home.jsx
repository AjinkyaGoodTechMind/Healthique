import React from "react";
import "./home.css";
import Navbar from "../../components/Navbar/Navbar";
import Freelancer from "../../components/Freelancer/Freelancer";
import FindTheBest from "../../components/FindTheBest/FindTheBest";
import Design from "../../components/Design/Design";
import Choose from "../../components/Choose/Choose";
import Portfolios from "../../components/Portfolios/Portfolios";
import Newsletter from "../../components/Newsletter/Newsletter";
import Footer from "../../components/Footer/Footer";
import PopularCities from "../../components/PopularCities/PopularCities";
import MembershipPlansHome from "../../components/membershipPlansHome/MembershipPlansHome";

const Home = () => {
  return (
    <div className="home-main">
      <Navbar />
      <Freelancer />
      <Choose />
      <Design />
      <PopularCities />
      <MembershipPlansHome />
      <Footer />
    </div>
  );
};

export default Home;
