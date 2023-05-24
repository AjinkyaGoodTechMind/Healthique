import React, { useEffect, useState } from "react";
import "./memberRegister.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../../slices/sessionSlice";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
import HeaderDashboard from "../../components/common/header/HeaderDashboard";
import Navbar from "../../components/Navbar/Navbar";

export default function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, isAuthenticated, error } = useSelector((state) => state.sessionSlice);
  // const { referedByMemberId } = useParams();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated]);

  const [user, setUser] = useState({
    username: "",
    email: "",
    contactNumber: "",
    password: "",
    reEnterPassword: "",
    role: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleRegister = (e) => {
    const { password, reEnterPassword } = user;

    e.preventDefault();

    // const myForm = new FormData();

    // myForm.set("username", username);
    // myForm.set("email", email);
    // myForm.set("contactNumber", contactNumber);
    // myForm.set("password", password);
    // myForm.set("role", role);

    if (password !== "" && password === reEnterPassword) {
      dispatch(register(user));
    } else {
      if (password === "") {
        alert("Please enter password");
      } else if (password !== reEnterPassword) {
        alert("Password and Re-entered Password does not match");
      }
    }
  };

  return loading ? (
    <Loader />
  ) : (
    <>
      <Navbar />

      <div className="memberRegister">
        <div className="register w-1/2 h-96 ml-24">
          <h1 className="text-2xl font-semibold">Signup</h1>
          <form onSubmit={handleRegister}>
            <input type="text" required={true} name="username" value={user.username} placeholder="Enter Name" onChange={handleChange}></input>
            <input type="text" required={true} name="email" value={user.email} placeholder="Enter Email" onChange={handleChange}></input>
            <input
              type="number"
              required={true}
              name="contactNumber"
              value={user.contactNumber}
              placeholder="Enter Contact Number"
              onChange={handleChange}
            ></input>
            <select name="role" required={true} onChange={handleChange}>
              <option value="" disabled selected>
                Select Role
              </option>
              <option value="customer">Customer</option>
              <option value="vendor">Vendor</option>
            </select>
            <input type="password" required={true} name="password" value={user.password} placeholder="Password" onChange={handleChange}></input>
            <input
              type="password"
              required={true}
              name="reEnterPassword"
              value={user.reEnterPassword}
              placeholder="Re-enter Password"
              onChange={handleChange}
            ></input>
            {error ? <span style={{ color: "red" }}>{error}</span> : null}

            <button className="p-2 pl-24 pr-24 clicabledivRegsiter bg-blue-500 h-10 rounded-md text-white  text-xl ">Register</button>
          </form>
          <div>OR</div>
          <Link to="/login">
            <button className="p-2 pl-36 pr-28 clicablediv bg-blue-500 h-10 rounded-md text-white  text-xl ">Login</button>
          </Link>
        </div>
      </div>
    </>
  );
}
