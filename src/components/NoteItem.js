import React, { useContext } from "react";
import NoteContext from "../context/notes/noteContext";

const NoteItem = ({ item, updateNote, showAlert }) => {
  const context = useContext(NoteContext);
  const { deleteNote } = context;

  return (
    <>
      <div className="col-md-3 my-2">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{item.title}</h5>
            <p className="card-text">{item.description}</p>
            <box-icon
              className="mx-3"
              name="trash-alt"
              animation="tada-hover"
              onClick={() => {
                deleteNote(item._id);
                showAlert("Note deleted successfully.", "success");
              }}
            ></box-icon>
            <box-icon
              className="mx-3"
              name="edit"
              animation="tada-hover"
              onClick={() => {
                updateNote(item);
              }}
            ></box-icon>
          </div>
        </div>
      </div>
    </>
  );
};

export default NoteItem;
