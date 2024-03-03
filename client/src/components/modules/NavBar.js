import React from "react";
import { Routes, Route } from "react-router-dom";
import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

import { Link } from 'react-router-dom';
const NavBar = (props) => {
    return (
      <nav className="NavBar-container">
        <div className="NavBar-title u-inlineBlock">Catbook</div>
        <div className="NavBar-title u-inlineBlock">|</div>
        <div className="NavBar-title-red u-inlineBlock">Game</div>
        <div className="NavBar-title u-inlineBlock">book</div>
        <div className="NavBar-linkContainer u-inlineBlock">
         
          {props.userId && (
            <Link to={`/profile/${props.userId}`} className="NavBar-link">
              Profile
            </Link>
          )}

          <Link to="/feed/" className="NavBar-link">
            Feed
          </Link>
          <Link to="/map/" className="NavBar-link">
            Map
          </Link>
          <Link to="/leaderboard/" className="NavBar-link">
            Leaderboard
          </Link>
          
          {props.userId ? (
            <GoogleLogout
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Logout"
              onLogoutSuccess={props.handleLogout}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          ) : (
            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Login"
              onSuccess={props.handleLogin}
              onFailure={(err) => console.log(err)}
              className="NavBar-link NavBar-login"
            />
          )}
        </div>
      </nav>
    );
  };

  export default NavBar;