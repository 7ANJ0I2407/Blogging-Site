// require('dotenv').config();
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import "../css/App.css";
import Footer from "./Footer";
const { REACT_APP_SIGN_IN_URL } = process.env;

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post( REACT_APP_SIGN_IN_URL , {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Login successful");
      navigate("/");
    } catch (error) {
        alert("Invalid credentials");
      console.error("Error during sign in:", error);
    }
  };

  return (
    <>
      <Header />
      <div style={{display: "flex", justifyContent:"center", alignItems:"center", padding: "40px"}}>
        <div className="signin-container">
          <h1 style={{textAlign:"center", color:"white"}}>Sign In</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="mb-3"style={{width:"80%"}}>
              <label className="form-label">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-control"
              />
            </div>
            <div className="mb-3"style={{width:"80%", padding:"0px 0px 20px"}}>
              <label className="form-label">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-control"
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Sign In
            </button>
          </form>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
}

export default SignIn;
