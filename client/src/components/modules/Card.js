import React, { useState, useEffect } from "react";
import { get } from "../../utilities";

import ImageUploader from "./ImageUploaader";

import "./Card.css";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 */






const Card = (props) => {
    const [participants, setParticipants] = useState([]);
  
    useEffect(() => {
      get("/api/add-participant").then((participants) => {
        setParticipants(participants);
      });
    }, []);

  


   

    return (
        <div className="Card-container">

           <h4>Upload Image:{ImageUploader}</h4>

          <SingleStory
            _id={props._id}
            post_id = {props.post_id}
            creator_name={props.creator_name}
            creator_id={props.creator_id}
            trash_number = {props.trash_number}
            participants = {props.participants}

          />
          
          <button onClick={addParticipant}>Join</button>
        </div>
      );


};

export default Card;