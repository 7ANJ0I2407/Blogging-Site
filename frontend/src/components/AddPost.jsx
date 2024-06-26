
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "./Header";

function Add_post() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token"); // Get the token from localStorage
    const decodedToken = parseJwt(token);
    try {
      const response = await axios.post(
        process.env.REACT_APP_ADD_POST_URL ,
        {
          title,
          description,
          userId: decodedToken.userId,
        },
        {
          headers: {
            authorization: token, // Include the token in the headers
          },
        }
      );
      console.log("Post created:", response.data);
      // Optionally redirect or show success message to user
      setTitle("");
      setDescription("");
      navigate("/"); // Navigate to home after posting a post
    } catch (error) {
      console.error("Error creating post:", error);
      // Handle error (show error message to user)
    }
  };

  const parseJwt = (token) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  return (
    <>
      <Header />
      <div style={{display:"flex", justifyContent:"center", alignItems:"center", margin: "80px"}}>
        <div className="add-post-container">
          <h1 style={{ textAlign: "center", color: "white" }}>Add Post</h1>
          <form onSubmit={handleSubmit} className="form-container">
            <div style={{width:"100%"}}>
              <label className="form-label">Post Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>
            <div style={{width:"100%", margin:"5px 0px 20px"}}>
              <label className="form-label">Post Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="form-control"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Add_post;
