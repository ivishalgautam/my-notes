import React, { useContext, useEffect, useRef, useState } from "react";
import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import NoteContext from "../context/notes/noteContext";
import { Button, Modal } from "react-bootstrap";
import uuid from "react-uuid";
import { useNavigate } from "react-router-dom";

const Notes = ({ showAlert }) => {
  let navigate = useNavigate();

  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const closeRef = useRef(null);

  const [note, setNote] = useState({
    id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const onClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.etitle, note.edescription, note.etag);
    closeRef.current.click();
    showAlert("Note updated successfully.", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  // handle modal
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <AddNote showAlert={showAlert} />

      <Button ref={ref} variant="primary d-none" onClick={handleShow}>
        Launch demo modal
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Note.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group my-3">
              <label htmlFor="etitle">Title</label>
              <input
                type="text"
                className="form-control"
                id="etitle"
                name="etitle"
                placeholder="Title"
                onChange={onChange}
                value={note.etitle}
                minLength={3}
                required
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="edescription">Description</label>
              <input
                type="text"
                className="form-control"
                id="edescription"
                name="edescription"
                placeholder="Description"
                onChange={onChange}
                value={note.edescription}
                minLength={3}
                required
              />
            </div>
            <div className="form-group my-3">
              <label htmlFor="etag">Tag</label>
              <input
                type="text"
                className="form-control"
                id="etag"
                name="etag"
                placeholder="Tag"
                onChange={onChange}
                value={note.etag}
                minLength={3}
                required
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button ref={closeRef} variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            disabled={
              note.etitle.length < 3 ||
              note.edescription.length < 3 ||
              note.etag.length < 3
            }
            variant="primary"
            onClick={onClick}
          >
            Update Note
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="row my-3">
        <h1 className="text-center">Your Notes.</h1>
        {notes.map((item) => {
          return (
            <NoteItem
              key={uuid()}
              item={item}
              updateNote={updateNote}
              showAlert={showAlert}
            />
          );
        })}
      </div>
    </>
  );
};

export default Notes;
