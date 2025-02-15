import React from "react";
import DeleteIcon from '@mui/icons-material/Delete';

function Note(props) {
  const handleClick = () => {
    props.onDelete(props.id); // Trigger the delete function passed down from App
  };

  return (
    <div className="note">
      <h1>{props.title}</h1>
      <p>{props.content}</p>
      <button onClick={handleClick}>
        <DeleteIcon />
      </button>
    </div>
  );
}

export default Note;
