import React, { useState, useEffect } from "react";
import { useCallback } from 'react';
import SingleStory from "./SingleStory.js";
import CommentsBlock from "./CommentsBlock.js";
import { get } from "../../server/utilities.js";

import "./Card.css";
import { addUser } from "../../server/server-socket.js";
import { name } from "file-loader";

/**
 * Card is a component for displaying content like stories
 *
 * Proptypes
 * @param {string} _id of the story
 * @param {string} creator_name
 * @param {string} creator_id
 * @param {string} content of the story
 * @param {Array} participants 
 * @param {string} location
 */



const Card = (props) => {

  const addParticipant = (props) => {
    useEffect(() => {
      get("/api/add-participant", { parent: props.participants }).then((participants) => {
        setParticipants(participants);
      });
    }, []);

  // Replace `clientId` with the actual client ID and `your-server-url` with your server's URL
  const clientId = req.query.clientId;
  fetch(`http://localhost:5050/add-participant?clientId=${clientId}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  console.log(participants)
};
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get("/api/comment", { parent: props._id }).then((comments) => {
      setComments(comments);
    });
  }, []);

  // this gets called when the user pushes "Submit", so their
  // post gets added to the screen right away
  const addNewComment = (commentObj) => {
    setComments(comments.concat([commentObj]));
  };

  return (
    <div className="Card-container">
      <div className = "Card-button">
        <button onClick={addEvent}>Join Cleanup</button>
      </div>
      <SingleStory
        _id={props._id}
        creator_name={props.creator_name}
        creator_id={props.creator_id}
        content={props.content}
        participants = {props.participants}
        location = {props.location}
        cleanup_date = {props.cleanup_date}
      />
      <CommentsBlock
        story={props}
        comments={comments}
        creator_id={props.creator_id}
        userId={props.userId}
        addNewComment={addNewComment}
      />
    </div>
  );
};

export default Card;