import React, { useEffect, useState } from "react";
import "./MembershipPlansHome.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { Box, Modal } from "@mui/material";
import InstantMessage from "../InstantMessage";
import InstantMessageSuccess from "../InstantMessageSuccess";

export default function MembershipPlansHome() {
  const { sessionUser } = useSelector((state) => state.sessionSlice);
  const [radioMonthly, setRadioMonthly] = useState(true);
  const [radioYearly, setRadioYearly] = useState(false);

  const [openPayment, setOpenPayment] = useState(false);

  const [plans, setPlans] = useState([]);

  const [subscripion, setSubscription] = useState({});

  const [error, setError] = useState(false); //Controls Alert
  const [message, setMessage] = useState(""); //Controls Message

  const [error2, setError2] = useState(false); //Controls Alert

  const [message2, setMessage2] = useState(""); //Controls Message

  const handleOpenPayment = () => {
    setOpenPayment(true);
  };

  const handleClosePayment = () => {
    setOpenPayment(false);
    window.location.reload();
    setMessage("Purchase Membership Plan Unsuccessful !!! ");
    setError(true);
  };

  const style = {
    display: "flex",
    justifyContent: "center",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  };

  const handleMonthly = () => {
    setRadioMonthly(true);
    setRadioYearly(false);
  };

  const handleYearly = () => {
    setRadioMonthly(false);
    setRadioYearly(true);
  };

  const getSubscription = async () => {
    await axios
      .get(`/api/plans/getSubscription`)
      .then(async ({ data }) => {
        setSubscription(data[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPlans = async () => {
    await axios
      .get(`/api/plans/getPlans`)
      .then(({ data }) => {
        setPlans(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPlans();
    getSubscription();
  }, []);

  const handleBuyPlan = async (plan) => {
    if (sessionUser.role === "vendor") {
      if (radioMonthly) {
        const success = async () => {
          let type = "monthly";
          let expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 28);
          await axios.post(`/api/plans/postSubscription`, { type, planId: plan._id, expireDate }).then((res) => {
            setError(false);
            setOpenPayment(false);
            setMessage2("Purchase Membership Plan Successful !!! ");
            setError2(true);
            getPlans();
            getSubscription();
          });
        };

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "/api/plans/createPayment",
          data: {
            order_amount: plan.monthlyPrice,
            order_currency: "INR",
            customer_details: {
              customer_id: sessionUser.userId,
              customer_phone: sessionUser.contactNumber.toString(),
              customer_email: sessionUser.email,
            },
          },
        };

        axios
          .request(config)
          .then((res) => {
            handleOpenPayment();
            const paymentSessionId = res.data.payment_session_id;
            const cashfree = new window.Cashfree(paymentSessionId);

            const dropinConfig = {
              components: ["order-details", "card", "netbanking", "app", "upi"],
              onSuccess: function (data) {
                console.log(data);
                success();
              },
              onFailure: function (data) {
                // handleClosePayment();
                setError2(false);
                setMessage("Payment Unsuccessful !!! ");
                setError(true);
              },
              style: {
                backgroundColor: "#ffffff",
                color: "#11385b",
                fontFamily: "Lato",
                fontSize: "14px",
                errorColor: "#ff0000",
                theme: "light",
              },
            };
            cashfree.drop(document.getElementById("payment-form"), dropinConfig);
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        const success = async () => {
          let type = "yearly";
          let expireDate = new Date();
          expireDate.setDate(expireDate.getDate() + 365);

          await axios.post(`/api/plans/postSubscription`, { type, planId: plan._id, expireDate }).then((res) => {
            setError(false);
            setOpenPayment(false);
            setMessage2("Purchase Membership Plan Successful !!! ");
            setError2(true);
            getPlans();
            getSubscription();
          });
        };

        let config = {
          method: "post",
          maxBodyLength: Infinity,
          url: "/api/plans/createPayment",
          data: {
            order_amount: plan.yearlyPrice,
            order_currency: "INR",
            customer_details: {
              customer_id: sessionUser.userId,
              customer_phone: sessionUser.contactNumber.toString(),
              customer_email: sessionUser.email,
            },
          },
        };

        axios
          .request(config)
          .then((res) => {
            handleOpenPayment();
            const paymentSessionId = res.data.payment_session_id;
            const cashfree = new window.Cashfree(paymentSessionId);

            const dropinConfig = {
              components: ["order-details", "card", "netbanking", "app", "upi"],
              onSuccess: function (data) {
                console.log(data);
                success();
              },
              onFailure: function (data) {
                // handleClosePayment();
                setError2(false);
                setMessage("Payment Unsuccessful !!! ");
                setError(true);
              },
              style: {
                backgroundColor: "#ffffff",
                color: "#11385b",
                fontFamily: "Lato",
                fontSize: "14px",
                errorColor: "#ff0000",
                theme: "light",
              },
            };
            cashfree.drop(document.getElementById("payment-form"), dropinConfig);
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      setMessage("Register a Vendor Account in order to Buy the Plan");
      setError(true);
    }
  };

  return (
    <div className="membershipPlansHome">
      <h1 style={{ marginTop: "50px", textAlign: "center" }}>
        Membership <span style={{ color: "#d6193f" }}>Plans</span>
      </h1>
      <div className="monthlyYearly">
        <div className="monthlyYearlyMain">
          <input type="radio" checked={radioMonthly} onChange={handleMonthly}></input>
          <span>Billed Monthly</span>
        </div>
        <div className="monthlyYearlyMain">
          <input type="radio" checked={radioYearly} onChange={handleYearly}></input>
          <span>Billed Yearly</span>
        </div>
      </div>
      {plans.length && (
        <>
          {radioMonthly ? (
            <div className="plansContainer">
              <div className="plan">
                <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                  <span className="planTitle">{plans[0].title}</span>
                  <span className="planText">{plans[0].description}</span>
                  <div className="priceDiv">
                    <span>Rs. {plans[0].monthlyPrice}/- (Monthly)</span>
                  </div>
                  <span className="planTitle" style={{ marginTop: "10px" }}>
                    Feature & Plan :
                  </span>
                  {plans[0].features.map((e, index) => {
                    return (
                      <span className="planText" key={index} style={{ marginTop: "5px" }}>
                        {e}
                      </span>
                    );
                  })}
                </div>

                {subscripion?.status && subscripion.status === "Active" ? null : (
                  <span className="buyNowButton" onClick={() => handleBuyPlan(plans[0])}>
                    Buy Now
                  </span>
                )}
              </div>
              <div className="recommendedPlan">
                <div className="recommendedPlan-header">
                  <span>Recommended</span>
                </div>

                <div className="plan">
                  <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    <span className="planTitle">{plans[1].title}</span>
                    <span className="planText">{plans[1].description}</span>
                    <div className="priceDiv">
                      <span>Rs. {plans[1].monthlyPrice}/- (Monthly)</span>
                    </div>
                    <span className="planTitle" style={{ marginTop: "10px" }}>
                      Feature & Plan :
                    </span>
                    {plans[1].features.map((e, index) => {
                      return (
                        <span className="planText" key={index} style={{ marginTop: "5px" }}>
                          {e}
                        </span>
                      );
                    })}
                  </div>

                  {subscripion?.status && subscripion.status === "Active" ? null : (
                    <span className="buyNowButton" onClick={() => handleBuyPlan(plans[1])}>
                      Buy Now
                    </span>
                  )}
                </div>
              </div>

              <div className="plan">
                <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                  <span className="planTitle">{plans[2].title}</span>
                  <span className="planText">{plans[2].description}</span>
                  <div className="priceDiv">
                    <span>Rs. {plans[2].monthlyPrice}/- (Monthly)</span>
                  </div>
                  <span className="planTitle" style={{ marginTop: "10px" }}>
                    Feature & Plan :
                  </span>
                  {plans[2].features.map((e, index) => {
                    return (
                      <span key={index} className="planText" style={{ marginTop: "5px" }}>
                        {e}
                      </span>
                    );
                  })}
                </div>

                {subscripion?.status && subscripion.status === "Active" ? null : (
                  <span className="buyNowButton" onClick={() => handleBuyPlan(plans[2])}>
                    Buy Now
                  </span>
                )}
              </div>
            </div>
          ) : (
            <div className="plansContainer">
              <div className="plan">
                <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                  <span style={{ fontSize: "25px", fontWeight: "600" }}>{plans[0].title}</span>
                  <span style={{ fontSize: "20px", fontWeight: "400", color: "gray", marginTop: "10px" }}>{plans[0].description}</span>
                  <div className="priceDiv">
                    <span>Rs. {plans[0].yearlyPrice}/- (Yearly)</span>
                  </div>
                  <span style={{ fontSize: "20px", fontWeight: "600", marginTop: "10px" }}>Feature & Plan :</span>
                  {plans[0].features.map((e, index) => {
                    return (
                      <span key={index} style={{ fontSize: "20px", fontWeight: "400", color: "gray", marginTop: "5px" }}>
                        {e}
                      </span>
                    );
                  })}
                </div>

                {subscripion?.status && subscripion.status === "Active" ? null : (
                  <span className="buyNowButton" onClick={() => handleBuyPlan(plans[0])}>
                    Buy Now
                  </span>
                )}
              </div>
              <div className="recommendedPlan">
                <div className="recommendedPlan-header">
                  <span>Recommended</span>
                </div>

                <div className="plan">
                  <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                    <span style={{ fontSize: "25px", fontWeight: "600" }}>{plans[1].title}</span>
                    <span style={{ fontSize: "20px", fontWeight: "400", color: "gray", marginTop: "10px" }}>{plans[1].description}</span>
                    <div className="priceDiv">
                      <span>Rs. {plans[1].yearlyPrice}/- (Yearly)</span>
                    </div>
                    <span style={{ fontSize: "20px", fontWeight: "600", marginTop: "10px" }}>Feature & Plan :</span>
                    {plans[1].features.map((e, index) => {
                      return (
                        <span key={index} style={{ fontSize: "20px", fontWeight: "400", color: "gray", marginTop: "5px" }}>
                          {e}
                        </span>
                      );
                    })}
                  </div>

                  {subscripion?.status && subscripion.status === "Active" ? null : (
                    <span className="buyNowButton" onClick={() => handleBuyPlan(plans[1])}>
                      Buy Now
                    </span>
                  )}
                </div>
              </div>

              <div className="plan">
                <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                  <span style={{ fontSize: "25px", fontWeight: "600" }}>{plans[2].title}</span>
                  <span style={{ fontSize: "20px", fontWeight: "400", color: "gray", marginTop: "10px" }}>{plans[2].description}</span>
                  <div className="priceDiv">
                    <span>Rs. {plans[2].yearlyPrice}/- (Yearly)</span>
                  </div>
                  <span style={{ fontSize: "20px", fontWeight: "600", marginTop: "10px" }}>Feature & Plan :</span>
                  {plans[2].features.map((e, index) => {
                    return (
                      <span key={index} style={{ fontSize: "20px", fontWeight: "400", color: "gray", marginTop: "5px" }}>
                        {e}
                      </span>
                    );
                  })}
                </div>

                {subscripion?.status && subscripion.status === "Active" ? null : (
                  <span className="buyNowButton" onClick={() => handleBuyPlan(plans[2])}>
                    Buy Now
                  </span>
                )}
              </div>
            </div>
          )}
        </>
      )}
      <Modal open={openPayment} onClose={handleClosePayment} keepMounted>
        <Box sx={style}>
          <div id="payment-form"></div>
        </Box>
      </Modal>

      {error ? <InstantMessage message={message} setError={setError} /> : null}

      {error2 ? <InstantMessageSuccess message={message2} setError={setError2} /> : null}
    </div>
  );
}
