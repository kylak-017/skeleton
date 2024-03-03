const SingleStory = (props) => {
    return (
      <div className="Card-story">
        <Link to={`/profile/${props.creator_id}`} className="u-link u-bold">
          {props.creator_name}
        </Link>
        <p className="Card-storyContent">
           <h3>Trash Number: {props.trash_number}</h3> 
           <h3>ID: {props.post_id}</h3>
           <h3>Location: {props.location}</h3>
           <h3>Participants: {props.participants}</h3>


        </p>
      </div>
    );
  };
  
  export default SingleStory;
