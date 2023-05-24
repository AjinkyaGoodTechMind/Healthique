import React, { useEffect, useState } from "react";
import "./Profile.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import DummyImage from "../../assets/dummyImage.png";
import moment from "moment";
import axios from "axios";
import { getSession } from "../../slices/sessionSlice";

export default function Profile() {
  const dispatch = useDispatch();

  const { sessionUser } = useSelector((state) => state.sessionSlice);

  const [image, setImage] = useState();

  const [edit, setEdit] = useState(false);

  const [user, setUser] = useState({
    profilePic: "",
    companyName: "",
    address: "",
    gstNo: "",
    landlineNo: "",
    altContactNumber: "",
    concernPersonName: "",
    concernPersonDesignation: "",
    concernPersonContactNumber: "",
    concernPersonEmail: "",
    authoriedPersonName: "",
    authoriedPersonDesignation: "",
    authoriedPersonContactNumber: "",
    authoriedPersonEmail: "",
  });

  const handleSetUser = () => {
    setUser({
      profilePic: sessionUser.profilePic,
      companyName: sessionUser.companyName,
      address: sessionUser.address,
      gstNo: sessionUser.gstNo,
      landlineNo: sessionUser.landlineNo,
      altContactNumber: sessionUser.altContactNumber,
      concernPersonName: sessionUser.concernPersonName,
      concernPersonDesignation: sessionUser.concernPersonDesignation,
      concernPersonContactNumber: sessionUser.concernPersonContactNumber,
      concernPersonEmail: sessionUser.concernPersonEmail,
      authoriedPersonName: sessionUser.authoriedPersonName,
      authoriedPersonDesignation: sessionUser.authoriedPersonDesignation,
      authoriedPersonContactNumber: sessionUser.authoriedPersonContactNumber,
      authoriedPersonEmail: sessionUser.authoriedPersonEmail,
    });
  };

  useEffect(() => {
    handleSetUser();
  }, [sessionUser]);

  const handleChange = (e) => {
    let value = e.target.value;
    let name = e.target.name;

    let newData = user;
    newData[name] = value;

    setUser({ ...newData });
  };

  const handleCancle = () => {
    handleSetUser();
    setEdit(false);
  };

  const handleSave = async () => {
    if (image) {
      let data = new FormData();
      data.append("image", image);

      data.append("companyName", user.companyName);
      data.append("address", user.address);
      data.append("gstNo", user.gstNo);
      data.append("landlineNo", user.landlineNo);
      data.append("altContactNumber", user.altContactNumber);

      data.append("concernPersonName", user.concernPersonName);
      data.append("concernPersonDesignation", user.concernPersonDesignation);
      data.append("concernPersonContactNumber", user.concernPersonContactNumber);
      data.append("concernPersonEmail", user.concernPersonEmail);

      data.append("authoriedPersonName", user.authoriedPersonName);
      data.append("authoriedPersonDesignation", user.authoriedPersonDesignation);
      data.append("authoriedPersonContactNumber", user.authoriedPersonContactNumber);
      data.append("authoriedPersonEmail", user.authoriedPersonEmail);

      let config = {
        method: "put",
        maxBodyLength: Infinity,
        url: "/api/session/update",
        data: data,
      };

      await axios
        .request(config)
        .then((res) => {
          console.log(res);
          dispatch(getSession());
          setEdit(false);
          setImage(null);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      await axios
        .put(`/api/session/update`, { ...user })
        .then((res) => {
          console.log(res);
          dispatch(getSession());
          setEdit(false);
          setImage(null);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const updateHeroImagesChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-main">
        <h1 style={{ marginBottom: "50px", fontSize: "30px" }}>
          Profile <span style={{ color: "#d6193f", fontSize: "30px" }}>Section</span>
        </h1>
        <div className="profileContainer">
          <div className="profileDiv">
            <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              {edit ? (
                <label className="custom-file-upload" style={{ width: "200px", height: "30px" }}>
                  <input type="file" onChange={updateHeroImagesChange} />
                  Upload Profile Pic
                </label>
              ) : (
                <>
                  {sessionUser.profilePic ? (
                    <img className="profilePic" src={sessionUser.profilePic} alt=""></img>
                  ) : (
                    <img className="profilePic" src={DummyImage} alt="{DummyImage}"></img>
                  )}
                </>
              )}
            </div>
            {edit ? (
              <div className="profileConainerMain">
                <div className="profileConainerMain1">
                  <span className="profileTitles">
                    Name: <span className="profileText">{sessionUser.username}</span>
                  </span>
                  <span className="profileTitles">
                    Email: <span className="profileText">{sessionUser.email}</span>
                  </span>
                  <span className="profileTitles">
                    Contact No: <span className="profileText">{sessionUser.contactNumber}</span>
                  </span>

                  <span className="profileTitles">
                    Company Name:
                    <input name="companyName" className="profileText" value={user.companyName} onChange={(e) => handleChange(e)}></input>
                  </span>

                  <span className="profileTitles">
                    Address: <input name="address" className="profileText" value={user.address} onChange={(e) => handleChange(e)}></input>
                  </span>

                  <span className="profileTitles">
                    GST No: <input name="gstNo" className="profileText" value={user.gstNo} onChange={(e) => handleChange(e)}></input>
                  </span>

                  <span className="profileTitles">
                    Landline No:
                    <input name="landlineNo" type="number" className="profileText" value={user.landlineNo} onChange={(e) => handleChange(e)}></input>
                  </span>

                  <span className="profileTitles">
                    Alternate Contact No:
                    <input
                      name="altContactNumber"
                      type="number"
                      maxLength="10"
                      className="profileText"
                      value={user.altContactNumber}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </span>

                  <span className="profileTitles">
                    Role: <span className="profileText">{sessionUser.role.toUpperCase()}</span>
                  </span>
                  <span className="profileTitles">
                    Joining Date: <span className="profileText">{moment(sessionUser.createdAt).format("DD/MM/YYYY")}</span>
                  </span>
                </div>

                <div className="profileConainerMain1">
                  <span className="profileTitles">
                    Concern Person Name:{" "}
                    <input name="concernPersonName" className="profileText" value={user.concernPersonName} onChange={(e) => handleChange(e)}></input>
                  </span>

                  <span className="profileTitles">
                    Concern Person Designation:
                    <input
                      name="concernPersonDesignation"
                      className="profileText"
                      value={user.concernPersonDesignation}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </span>

                  <span className="profileTitles">
                    Concern Person Contact No:
                    <input
                      name="concernPersonContactNumber"
                      type="number"
                      maxLength="10"
                      className="profileText"
                      value={user.concernPersonContactNumber}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </span>

                  <span className="profileTitles">
                    Concern Person Email:
                    <input
                      name="concernPersonEmail"
                      className="profileText"
                      value={user.concernPersonEmail}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </span>

                  <hr />

                  <span className="profileTitles">
                    Authoried Person Name:{" "}
                    <input
                      name="authoriedPersonName"
                      className="profileText"
                      value={user.authoriedPersonName}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </span>

                  <span className="profileTitles">
                    Authoried Person Designation:
                    <input
                      name="authoriedPersonDesignation"
                      className="profileText"
                      value={user.authoriedPersonDesignation}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </span>

                  <span className="profileTitles">
                    Authoried Person Contact No:
                    <input
                      name="authoriedPersonContactNumber"
                      type="number"
                      maxLength="10"
                      className="profileText"
                      value={user.authoriedPersonContactNumber}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </span>

                  <span className="profileTitles">
                    Authoried Person Email:{" "}
                    <input
                      name="authoriedPersonEmail"
                      className="profileText"
                      value={user.authoriedPersonEmail}
                      onChange={(e) => handleChange(e)}
                    ></input>
                  </span>
                </div>
              </div>
            ) : (
              <div className="profileConainerMain">
                <div className="profileConainerMain1">
                  <span className="profileTitles">
                    Name: <span className="profileText">{sessionUser?.username}</span>
                  </span>
                  <span className="profileTitles">
                    Email: <span className="profileText">{sessionUser?.email}</span>
                  </span>
                  <span className="profileTitles">
                    Contact No: <span className="profileText">{sessionUser?.contactNumber}</span>
                  </span>

                  <span className="profileTitles">
                    Company Name: <span className="profileText">{sessionUser?.companyName}</span>
                  </span>

                  <span className="profileTitles">
                    Address: <span className="profileText">{sessionUser?.address}</span>
                  </span>

                  <span className="profileTitles">
                    GST No: <span className="profileText">{sessionUser?.gstNo}</span>
                  </span>

                  <span className="profileTitles">
                    Landline No: <span className="profileText">{sessionUser?.landlineNo}</span>
                  </span>

                  <span className="profileTitles">
                    Alternate Contact No: <span className="profileText">{sessionUser?.altContactNumber}</span>
                  </span>

                  <span className="profileTitles">
                    Role: <span className="profileText">{sessionUser?.role?.toUpperCase()}</span>
                  </span>
                  <span className="profileTitles">
                    Joining Date: <span className="profileText">{moment(sessionUser?.createdAt).format("DD/MM/YYYY")}</span>
                  </span>
                </div>

                <div className="profileConainerMain1">
                  <span className="profileTitles">
                    Concern Person Name: <span className="profileText">{sessionUser?.concernPersonName}</span>
                  </span>

                  <span className="profileTitles">
                    Concern Person Designation: <span className="profileText">{sessionUser?.concernPersonDesignation}</span>
                  </span>

                  <span className="profileTitles">
                    Concern Person Contact No: <span className="profileText">{sessionUser?.concernPersonContactNumber}</span>
                  </span>

                  <span className="profileTitles">
                    Concern Person Email: <span className="profileText">{sessionUser?.concernPersonEmail}</span>
                  </span>

                  <hr />

                  <span className="profileTitles">
                    Authoried Person Name: <span className="profileText">{sessionUser?.authoriedPersonName}</span>
                  </span>

                  <span className="profileTitles">
                    Authoried Person Designation: <span className="profileText">{sessionUser?.authoriedPersonDesignation}</span>
                  </span>

                  <span className="profileTitles">
                    Authoried Person Contact No: <span className="profileText">{sessionUser?.authoriedPersonContactNumber}</span>
                  </span>

                  <span className="profileTitles">
                    Authoried Person Email: <span className="profileText">{sessionUser?.authoriedPersonEmail}</span>
                  </span>
                </div>
              </div>
            )}

            {edit ? (
              <div className="editButonDiv">
                <span className="editButon" onClick={handleCancle}>
                  Cancle
                </span>
                <span className="editButon" onClick={handleSave}>
                  Save
                </span>
              </div>
            ) : (
              <div className="editButonDiv">
                <span className="editButon" onClick={() => setEdit(true)}>
                  Edit
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
