import React, { useState, useEffect } from "react";
import axios from "axios";
import EditPost from "./EditPost"; // Import the EditPost component
import Header from "./Header"; // Import Header component
const MyPostURL = process.env.REACT_APP_MY_POST_API_URL;


function PostsManager() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
      fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    try {
      const response = await axios.get( MyPostURL , {
        headers: {
          token: token,
        },
      }); //API endpoint
      console.log(response.data);
      setPosts(response.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const handleSave = async (updatedPost) => {
    try {
      // Update the post on the server
      await axios.put(`${MyPostURL}/${updatedPost.id}`, {
        description: updatedPost.title,
      });

      setPosts(
        posts.map((post) =>
          post._id === updatedPost.id ? { ...post, title: updatedPost.title } : post
        )
      );
    } catch (error) {
      console.error("Error updating post:", error);
    }
  };

  const handleDelete = async (postId) => {
    try {
      await axios.delete(`${MyPostURL}/${postId}`); //API endpoint
      setPosts(posts);
      alert("Post deleted successfully!!");
      window.location.reload();
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="post-list">
        {posts.map((post) => (
          <EditPost
            key={post._id}
            news_title={post.description}
            news_num={post._id}
            btn={["Edit", "Delete"]}
            onSave={handleSave}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </>
  );
}

export default PostsManager;
