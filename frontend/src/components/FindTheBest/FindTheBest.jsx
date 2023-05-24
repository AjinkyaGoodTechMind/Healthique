import React from 'react';
import pngegg from "../../assets/images/pngegg.png"
import './FindTheBest.css'

const FindTheBest = () => {
    return (
        <div>
            <div className="Find-div">
                <div className="find-sec-div">
                <div className="imgtag">
                    <img src={pngegg} alt="" />
                    <div>
                        <div className="box-card">
                           <span style={{fontSize:"20px",color:"#1E88E5",fontWeight:"600",}}>500+</span>
                           <p>Freelancers</p>
                        </div>
                        <div className="box-card2">
                        <span style={{fontSize:"20px",color:"#1E88E5",fontWeight:"600"}}>300+</span>
                           <p>Freelance work posted</p>
                        </div>
                    </div>
                </div>
                <div className="find-text">
                    <h1>Find The Best <span style={{fontSize:"50px",color:"#1E88E5"}}>Freelancers</span> Here </h1>
                    <p style={{color:"#9D9D9D",fontSize:"20px"}}>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                         Ut erat bibendum ornare urna, cursus eget convallis. Feugiat
                         imperdiet posuere justo, ultrices interdum
                        sed orci nunc, mattis. Ipsum viverra viverra neque adipiscing arcu,
                        quam dictum. Dui mi viverra dui, sit accumsan, tincidunt massa. Dui cras magnis.
                    </p>
                </div>
                </div>
            </div>
        </div>
    );
};

export default FindTheBest;