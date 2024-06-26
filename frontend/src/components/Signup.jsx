import React, { useState, useEffect } from "react";
import "../css/App.css";
import Header from "./Header";
import { Link, useNavigate } from "react-router-dom";
import Footer from "./Footer";

function Signup() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/"); // Redirect to home if already signed in
    }
  }, [navigate]);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(process.env.REACT_APP_SIGN_UP_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Registration successful:", data);
        window.alert("Registration successful. Redirecting to sign in page.");
        window.location.href = "/sign-in";
      } else {
        const errorData = await response.json();
        console.error("Registration failed:", errorData);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: "40px" }}>
        <div className="signup-container">
          <h1 style={{ textAlign: "center", color: "white" }}>Sign Up</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <div className="mb-3" style={{ width: "80%" }}>
              <label htmlFor="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                name="email"
                type="email"
                className="form-control"
                required
                value={formData.email}
                onChange={handleChange}
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
              />
              <div id="emailHelp" className="form-text">
                I'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3" style={{ width: "80%" }}>
              <label htmlFor="exampleInputUsername" className="form-label">
                Username
              </label>
              <input
                name="username"
                type="text"
                className="form-control"
                required
                value={formData.username}
                onChange={handleChange}
                id="exampleInputUsername"
                aria-describedby="emailHelp"
              />
            </div>
            <div className="mb-3" style={{ width: "80%" }}>
              <label htmlFor="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                name="password"
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                required
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <button type="submit" className="btn btn-outline-secondary submit-btn-signup">
              Continue <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Signup;
