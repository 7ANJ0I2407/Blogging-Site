require('dotenv').config();
const mongoose = require("mongoose");


mongoose.connect(
    process.env.MONGOOSE_URI
  );
  
  const User = mongoose.model("Users", {
    email: String,
    password: String,
    username: String,
  });
  
  const Post = mongoose.model("Posts", {
    title: String,
    description: String,
    userId: String,
  });

  module.exports = {
    User,
    Post
  }