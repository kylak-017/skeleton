import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

import Card from "./Card";

import "../../utilities.css";
import "./Profile.css";

const Profile = (props) => {
    const [xp, setXP] = useState(0);
    const [event, setEvent] = useState([]);
    const[user, setUser] = useState();


useEffect(() => {
    get(`/api/user`, { userid: props.userId }).then((userObj) => setUser(userObj));
}, []);

const incrementXP = () => {
    setXP(XP +10);
};

if(!user){
    return <div>Still loading...</div>
}

return (
        <div
        className="Profile-avatarContainer"
        onClick={() => {
          incrementXP();
        }}
      >
         <h1 className="Profile-name u-textCenter">{user.name}</h1>
         <div className="Profile-subContainer u-textCenter">
          <h4 className="Profile-subTitle">XP</h4>
          <xp xp ={xp} />
          <h4>When you complete a "story" on the "Feed", click on the button to increase your XP by 10!</h4>
          <h4>Your Events: {Card}</h4>
        </div>


        </div>
);
};

export default Profile;



