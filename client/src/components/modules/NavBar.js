import React from "react";
import { Link } from "react-router-dom";
// import GoogleLogin, { GoogleLogout } from "react-google-login";

import "./NavBar.css";

// This identifies your web application to Google's authentication service
const GOOGLE_CLIENT_ID = "395785444978-7b9v7l0ap2h3308528vu1ddnt3rqftjc.apps.googleusercontent.com";

/**
 * The navigation bar at the top of all pages. Takes no props.
 */
const NavBar = (props) => {
  return (
    <nav className="NavBar-container">
      <div className="NavBar-title u-inlineBlock">Profile</div>
      <div className="NavBar-title u-inlineBlock">|</div>
      <div className="NavBar-title u-inlineBlock">Feed</div>
      <div className="NavBar-title u-inlineBlock">|</div>
      <div className="NavBar-title-red u-inlineBlock">Map</div>
      <div className="NavBar-title u-inlineBlock">|</div>
      <div className="NavBar-title u-inlineBlock">Leaderboard</div>
      <div className="NavBar-linkContainer u-inlineBlock">
  
        {props.userId && (
          <Link to={`/profile/${props.userId}`} className="NavBar-link">
            Profile
          </Link>
        )}
        <Link to="/Feed/" className="NavBar-link">
          Feed
        </Link>
        <Link to="/Map/" className="NavBar-link">
          Map
        </Link>
        <Link to="/Leaderboard/" className="NavBar-link">
          Leaderboard
        </Link>
        {/* {props.userId ? (
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
        )} */}
      </div>
    </nav>
  );
};

export default NavBar;