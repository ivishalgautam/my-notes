import React, { useContext, useState } from "react";
import NoteContext from "../context/notes/noteContext";

const AddNote = ({ showAlert }) => {
  const context = useContext(NoteContext);
  const { addNote } = context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const onClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    showAlert("Note added successfully.", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container my-3">
        <h1>Add a note.</h1>
        <form className="my-3">
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title:
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Title"
              value={note.title}
              onChange={onChange}
              minLength={3}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description:
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              placeholder="Description"
              value={note.description}
              onChange={onChange}
              minLength={3}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              Tag:
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="Tag"
              value={note.tag}
              onChange={onChange}
              minLength={3}
              required
            ></input>
          </div>
          <button
            disabled={
              note.title.length < 3 ||
              note.description.length < 3 ||
              note.tag.length < 3
            }
            className="btn btn-primary"
            onClick={onClick}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default AddNote;
