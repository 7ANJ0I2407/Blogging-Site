// src/RequireAuth.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    //no token is found, redirect to the sign-in page
    return <Navigate to="/sign-up" />;
  }

  //token is found, render the children components
  return children;
};

export default RequireAuth;
