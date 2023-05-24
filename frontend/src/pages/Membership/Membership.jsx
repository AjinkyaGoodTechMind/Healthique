import React, { useEffect, useState } from "react";
import "./membership.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import MembershipPlansHome from "../../components/membershipPlansHome/MembershipPlansHome";
import { useSelector } from "react-redux";
import axios from "axios";
import moment from "moment";
import { Box, Modal } from "@mui/material";
import InstantMessage from "../../components/InstantMessage";
import InstantMessageSuccess from "../../components/InstantMessageSuccess";

export default function Membership() {
  const { sessionUser, loading } = useSelector((state) => state.sessionSlice);

  const [subscripion, setSubscription] = useState({});
  const [activePlan, setActivePlan] = useState({});
  const [openPayment, setOpenPayment] = useState(false);

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

  const getSubscription = async () => {
    await axios
      .get(`/api/plans/getSubscription`)
      .then(async ({ data }) => {
        setSubscription(data[0]);
        await axios.get(`/api/plans/getPlans`).then((res) => {
          let plansData = res.data;

          plansData = plansData.filter((e) => e._id.toString() === data[0].planId.toString());

          setActivePlan(plansData[0]);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSubscription();
  }, []);

  const handleRenew = async () => {
    if (subscripion.type === "monthly") {
      const success = async () => {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 28);
        await axios
          .put(`/api/plans/updateSubscription`, { type: subscripion.type, planId: subscripion.planId, expireDate, status: "Active" })
          .then((res) => {
            setError(false);
            setOpenPayment(false);
            setMessage2("Membership Plan Renewed Successful !!! ");
            setError2(true);
            getSubscription();
          })
          .catch((err) => {
            console.log(err);
          });
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/plans/createPayment",
        data: {
          order_amount: activePlan.monthlyPrice,
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
          cashfree.drop(document.getElementById("payment-form2"), dropinConfig);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const success = async () => {
        let expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 365);
        await axios
          .put(`/api/plans/updateSubscription`, { type: subscripion.type, planId: subscripion.planId, expireDate, status: "Active" })
          .then((res) => {
            setError(false);
            setOpenPayment(false);
            setMessage2("Membership Plan Renewed Successful !!! ");
            setError2(true);
            getSubscription();
          })
          .catch((err) => {
            console.log(err);
          });
      };

      let config = {
        method: "post",
        maxBodyLength: Infinity,
        url: "/api/plans/createPayment",
        data: {
          order_amount: activePlan.yearlyPrice,
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
          cashfree.drop(document.getElementById("payment-form2"), dropinConfig);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="membership">
      <Navbar />

      {/* <h1 style={{ marginTop: "50px", textAlign: "center" }}>
        Membership <span style={{ color: "#d6193f" }}>Plans</span>
      </h1> */}

      {sessionUser && sessionUser._id && sessionUser.role === "vendor" && (
        <div className="activePlan">
          <h1 style={{ color: "#d6193f", marginBottom: "30px" }}>Current Plan</h1>
          <div style={{ display: "flex" }}>
            <div style={{ display: "flex", flexDirection: "column", flex: "2" }}>
              <span style={{ fontSize: "25px", fontWeight: "600" }}>{activePlan?.title}</span>
              <span style={{ fontSize: "20px", fontWeight: "400", color: "gray", marginTop: "10px" }}>{activePlan?.descripion}</span>
              <span style={{ fontSize: "20px", fontWeight: "600", marginTop: "10px" }}>Feature & Plan :</span>
              {activePlan?.features?.map((e, index) => {
                return (
                  <span key={index} style={{ fontSize: "20px", fontWeight: "400", color: "gray", marginTop: "5px" }}>
                    {e}
                  </span>
                );
              })}
            </div>

            <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
              <div style={{ display: "flex", flexDirection: "column", flex: "1" }}>
                <div className="priceDiv">
                  {subscripion.type === "monthly" ? (
                    <span>Rs. {activePlan.monthlyPrice}/- (Monthly)</span>
                  ) : (
                    <span>Rs. {activePlan.yearlyPrice}/- (Yearly)</span>
                  )}
                </div>
                {subscripion.status === "Active" ? (
                  <span className="expire">Exipring On: {moment(subscripion.expireDate).format("DD/MM/YYYY")} </span>
                ) : (
                  <>
                    <span className="expire">Expired</span>
                    <span className="buyNowButton" onClick={() => handleRenew()}>
                      Renew Plan
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <MembershipPlansHome />

      <Modal open={openPayment} onClose={handleClosePayment} keepMounted>
        <Box sx={style}>
          <div id="payment-form2"></div>
        </Box>
      </Modal>

      <Footer />

      {error ? <InstantMessage message={message} setError={setError} /> : null}

      {error2 ? <InstantMessageSuccess message={message2} setError={setError2} /> : null}
    </div>
  );
}
