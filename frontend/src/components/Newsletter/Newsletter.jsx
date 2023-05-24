import React from 'react';
import './Newsletter.css'

const Newsletter = () => {
    return (
        <div>
            <div className="Subscription">
                <div style={{ marginTop: "60px", paddingTop: "60px", textAlign: "center" }}>
                    <h1>Newsletter Subscription</h1>
                    <p style={{ color: "rgb(157, 157, 157)" }}>Subscribe to our newsletter to get new freelance work and projects </p>
                </div>
                <div>
                    <form className="example2" style={{ margin: "auto", maxWidth: "500px" }}>
                        <p style={{ textAlign: "center", paddingTop: "13px", color: "rgb(157, 157, 157)", fontSize: "20px", padding:"17px" , marginTop:'30px', marginBottom:"30px"}}>Enter your email address</p>
                    </form>
                </div>
                <div className="scbbtn">
                        <button style={{ width: "200px", backgroundColor: "#1E88E5", color: "white" }} className='sub_btn'>Subscribe</button>
                    </div>
            </div>
        </div>
    );
};

export default Newsletter;