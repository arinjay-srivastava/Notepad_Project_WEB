const express = require("express");
const Note = require("../models/note");
const router = express.Router();

router
  .post('/notes', async (req, res) => {
    try {
      const noteId = await Note.createNote(req.body);
      res.status(201).json({ success: "Note created successfully!", noteId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .get('/notes/:noteid', async (req, res) => {
    try {
      const note = await Note.getNoteById(req.params.noteid);
      res.json(note[0] || {});
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .get('/notes/user/:userId', async (req, res) => {
    try {
      const notes = await Note.getAllNotesByUserId(req.params.userId);
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .get('/notes', async (req, res) => {
    try {
      const userId = req.query.userId;
      if (!userId) {
        return res.status(400).json({ message: "userId query parameter is required" });
      }
      const notes = await Note.getAllNotes(userId);
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .put('/notes/:noteid', async (req, res) => {
    try {
      await Note.updateNoteById(req.params.noteid, req.body);
      res.json({ success: "Note updated successfully!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete('/notes/:noteid', async (req, res) => {
    try {
      await Note.deleteNoteById(req.params.noteid);
      res.json({ success: "Note deleted successfully!" });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

module.exports = router;