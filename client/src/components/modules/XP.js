import React from "react";
import "./XP.css";

const xp = (props) => {
    return (
      <div className="XP-container">
        <div className="XP-story">
          <p className="XP-storyContent">{props.xp}</p>
        </div>
      </div>
    );
  };
  
  export default xp;