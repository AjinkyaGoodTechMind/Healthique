import React, { useState } from "react";
import "./contact.css";
import Footer from "../../components/Footer/Footer";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import InstantMessageSuccess from "../../components/InstantMessageSuccess";

const Contact = () => {
  const [query, setQuery] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [error, setError] = useState(false); //Controls Alert

  const [message, setMessage] = useState(""); //Controls Message

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post(`/api/admin/postQueries`, { ...query })
      .then((res) => {
        setQuery({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
        setMessage("Query Submited Successfully !!!");
        setError(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Navbar />
      <section className="contacts padding">
        <h1 style={{ marginBottom: "100px", fontSize: "30px" }}>
          Contact <span style={{ color: "#d6193f", fontSize: "30px" }}>Us</span>
        </h1>
        <div className="container flexSB ">
          <div className="left row map">
            <iframe
              class="gmap_iframe"
              width="100%"
              frameborder="0"
              scrolling="no"
              marginheight="0"
              marginwidth="0"
              src="https://maps.google.com/maps?width=600&amp;height=400&amp;hl=en&amp;q=A-275 Second Floor Okhla Phase-I, New Delhi - 110020&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
            ></iframe>
          </div>
          <div className="right row">
            <p>We're open for any suggestion or just to have a chat</p>

            <div className="items grid2">
              <div className="box">
                <h4>ADDRESS:</h4>
                <p>A-275 Second Floor Okhla Phase-I, New Delhi - 110020</p>
              </div>
              <div className="box">
                <h4>EMAIL:</h4>
                <p>care@healthique.in</p>
              </div>
              {/* <div className="box">
                <h4>PHONE:</h4>
                <p> + 1235 2355 98</p>
              </div> */}
            </div>

            <form onSubmit={handleSubmit}>
              <div className="flexSB">
                <input type="text" placeholder="Name" value={query.name} onChange={(e) => setQuery((prev) => ({ ...prev, name: e.target.value }))} />
                <input
                  type="email"
                  placeholder="Email"
                  value={query.email}
                  onChange={(e) => setQuery((prev) => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <input
                type="text"
                placeholder="Subject"
                value={query.subject}
                onChange={(e) => setQuery((prev) => ({ ...prev, subject: e.target.value }))}
              />
              <textarea cols="30" rows="10" value={query.message} onChange={(e) => setQuery((prev) => ({ ...prev, message: e.target.value }))}>
                Create a message here...
              </textarea>
              <button type="submit" className="primary-btn">
                SEND MESSAGE
              </button>
            </form>
            {/* 
            <h3>Follow us here</h3>
            <span>FACEBOOK TWITTER INSTAGRAM DRIBBBLE</span> */}
          </div>
        </div>
      </section>
      {error ? <InstantMessageSuccess message={message} setError={setError} /> : null}
      <Footer />
    </>
  );
};

export default Contact;
