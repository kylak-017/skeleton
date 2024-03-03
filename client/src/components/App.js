import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar.js";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./modules/Profile.js";
import Skeleton from "./Skeleton.js";
import { Routes, Route } from "react-router-dom";

import jwt_decode from "jwt-decode";



import "../utilities.css";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";
import Leaderboard from "./modules/Leaderboard.js";
import { NewPostInput } from "./modules/NewPostInput.js";

/**
 * Define the "App" component
 */

// require('dotenv').config();

// Now you can require other modules and use the loaded environment variables
// const express = require('express');
// const mongoose = require('mongoose');

const App = () => {
  const [userId, setUserId] = useState(undefined);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (credentialResponse) => {
    const userToken = credentialResponse.credential;
    const decodedCredential = jwt_decode(userToken);
    console.log(`Logged in as ${decodedCredential.name}`);
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    setUserId(undefined);
    post("/api/logout");
  };

  return (
    <>
    <NavBar />
    <Routes>
      <Route
        path="/"
        element={
          <Skeleton
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />
        }/>
         <Route
            path = "/Feed"
            element = {
              <Feed/>
    

            }
            />

         <Route
            path = "/Leaderboard"
            element = {
              <Leaderboard/>
            }
            />

        <Route
            path = "/Profile"
            element = {
              <Profile/>
            }
            />
      <Route path="*" element={<NotFound />} />
    </Routes>
    </>
  );
};

export default App;
