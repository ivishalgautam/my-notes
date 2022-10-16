const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// Middleware to authenticate the user
const fetchUser = require("../middleware/fetchUser");

// Route 1: Fetching all the notes.
router.get(
  "/fetchAllNotes",
  fetchUser,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const notes = await Note.find({ user: req.user._id });
      res.json(notes);
    } catch (error) {
      console.log(error);
    }
  }
);

// Route 2: Add a new note.
router.post(
  "/addNote",
  fetchUser,
  [
    body("title", "enter a valid title").isLength({ min: 3 }),
    body("description", "enter a valid description").isLength({ min: 3 }),
    body("tag", "enter a valid tag").isLength({ min: 3 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(401).json({ errors: errors.array() });
    }

    try {
      const note = new Note({
        title: req.body.title,
        description: req.body.description,
        tag: req.body.tag,
        user: req.user._id,
      });
      const savedNote = await note.save();
      res.send(savedNote);
    } catch (error) {
      console.log(error.message);
      res.status(500).send("internal server error");
    }
  }
);

// Route 3: Update an existing note.
router.put("/updateNote/:id", fetchUser, async (req, res) => {
  const updatedNote = {};
  if (req.body.title || req.body.description || req.body.tag) {
    // Update the title.
    updatedNote.title = req.body.title;
    // Update the description.
    updatedNote.description = req.body.description;
    // Update the tag.
    updatedNote.tag = req.body.tag;
  }
  try {
    // find the note to be updated update it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user._id) {
      return res.status(401).send("Access denied bhosad.");
    }

    // if user id is exist then it will be updated
    if (note) {
      let user = await Note.findByIdAndUpdate(req.params.id, updatedNote, {
        new: true,
      });
      res.send(user);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

// Route 4: Delete an existing note.
router.delete("/deleteNote/:id", fetchUser, async (req, res) => {
  try {
    // find the note to be updated update it.
    let note = await Note.findById(req.params.id);
    if (!note) {
      return res.status(404).send("not found");
    }
    if (note.user.toString() !== req.user._id) {
      return res.status(401).json({ warning: "Access denied bhosad" });
    }

    // if user id is exist then it will be updated
    if (note) {
      let user = await Note.findByIdAndDelete(req.params.id);
      res.json({ success: "User deleted successfully" });
      console.log(note.user.toString());
      console.log(req.user._id);
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).send("internal server error");
  }
});

module.exports = router;
