import React, { useState, useEffect } from "react";
import NavBar from "./modules/NavBar.js";
import Feed from "./pages/Feed.js";
import NotFound from "./pages/NotFound.js";
import Profile from "./pages/Profile.js";
import Skeleton from "./Skeleton.js";
import { Routes, Route } from "react-router-dom";

import { socket } from "../client-socket.js";

import { get, post } from "../utilities";

// to use styles, import the necessary CSS files

import "./App.css";

/**
 * Define the "App" component as a function.
 */
const App = () => {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    get("/api/whoami").then((user) => {
      if (user._id) {
        // they are registed in the database, and currently logged in.
        setUserId(user._id);
      }
    });
  }, []);

  const handleLogin = (res) => {
    const userToken = res.tokenObj.id_token;
    post("/api/login", { token: userToken }).then((user) => {
      setUserId(user._id);
      post("/api/initsocket", { socketid: socket.id });
    });
  };

  const handleLogout = () => {
    console.log("Logged out successfully!");
    setUserId(null);
    post("/api/logout");
  };

  // required method: whatever is returned defines what
  // shows up on screen
  return (
    // <> is like a <div>, but won't show
    // up in the DOM tree
    <>
      {/* <NavBar handleLogin={handleLogin} handleLogout={handleLogout} userId={userId} /> */}
      {/* <div className="App-container">
        <Router>
          <Feed path="/" userId={userId} />
          <Profile path="/profile/:userId" />
          <Leaderboard path="/leaderboard/:userId" userId={userId} />
          <Feed path="/feed/" userId={userId} />
          <Map path="/map/" userId={userId} />
          <NotFound default />
        </Router>
      </div> */}
      <Routes>
        <Route path="/" element={<Feed userId={userId}/>}/>
        <Route path="/profile" element={<Skeleton
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />}/>
        <Route path="/leaderboard" element={<Skeleton
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />}/>
         <Route path="/map" element={<Skeleton
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />}/>
        <Route path="/feed" element={<Skeleton
            path="/"
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            userId={userId}
          />}/>
      </Routes>
    </>
  );
};

export default App;