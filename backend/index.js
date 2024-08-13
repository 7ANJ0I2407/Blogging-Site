require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, Post } = require("./schemas/DB_Schemas");
const rateLimit = require('express-rate-limit');



const app = express();
const port =  process.env.PORT || 8000;
const secretKey = process.env.SECRET_KEY; //secure key in production

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);

// Signup Route
app.post("/sign-up", async (req, res) => {
  console.log("Signup request received " + req.body.email);
  const { email, username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const result = await User.create({
      email: email,
      password: hashedPassword,
      username: username,
    });
    console.log(result + " Created Successfully");
    res.status(200).json({ message: "Signup successful" });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Signup failed" });
  }
});

//home route

app.get("/", async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});

// Signin Route
app.post("/sign-in", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      console.log("User Not Found " + email + " " + password);
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Invalid credentials Entered " + email + " " + password + " " + user);
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey, {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Signin successful", token });
  } catch (error) {
    console.error("Error during signin:", error);
    res.status(500).json({ message: "Signin failed" });
  }
});

// Middleware to verify token
const authenticateToken = (req, res, next) => {
  const token = req.headers["authorization"];
  const decoded = jwt.verify(token, secretKey);
  console.log(decoded); // Decoded payload
  if (!token) return res.status(401).json({ message: "Access denied" });

  try {
    jwt.verify(token, secretKey, (err, user) => {
      if (err) return res.status(403).json({ message: "Invalid token" });
      next();
    });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      console.error("JWT error:", error);
      return res.status(403).json({ message: "Invalid token" });
    }
    console.error("Error during authentication:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const authenticateUser = async (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied, no token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;

    // Check if user exists in the database
    const user = await User.findById(userId);
    if (!user) {
      return res.status(403).json({ message: "Forbidden, user not found" });
    }

    // Add user information to request object
    req.user = user;
    next();
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(403).json({ message: "Invalid token" });
  }
};

// Add Post Route
app.post("/add-post", authenticateToken, async (req, res) => {
  console.log(
    "Add post request received " + req.body.title + " " + req.body.description
  );
  try {
    const { title, description, userId } = req.body;
    console.log(
      "Post request received " + title + " " + description + " " + userId
    );
    const newPost = new Post({ title, description, userId });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (error) {
    console.error("Error saving post:", error);
    res.status(500).json({ error: "Error saving post" });
  }
});

app.get("/posts", async (req, res) => {
  try {
    const token = req.headers.token;
    const decoded = jwt.verify(token, secretKey);
    const userId = decoded.userId;
    const posts = await Post.find({ userId: userId });
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "Error fetching posts" });
  }
});


app.delete("/posts/:id", async (req, res) => {

  try {
    const postId = req.params.id;
    console.log("Post ID: " + postId);
    const deletedPost = await Post.findByIdAndDelete(postId);
    res.status(200).json(deletedPost);
  }
  catch (error) {
    console.error("Error deleting post:", error);
    res.status(500).json({ error: "Error deleting post" });
  }
});

app.put("/posts/:id", async (req, res) => {
  try {
    const postId = req.params.id;
    const updatedPost = await Post.findByIdAndUpdate(postId, req.body, {
      new: true,
    });
    res.status(200).json(updatedPost);
  } catch (error) {
    console.error("Error updating post:", error);
    res.status(500).json({ error: "Error updating post" });
  }
});



// Server start
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});
