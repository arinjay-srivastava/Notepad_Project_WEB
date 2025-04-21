const express = require("express");
const Note = require("../models/Note");
const router = express.Router();

router
  // Create a new note for a User route
  .post('/postnotes', async (req, res) => {
    try {
      await Note.createNote(req.body);
      res.status(201).send({ success: "Note created successfully!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })
  

  // Read a note by ID route
  .get('/getnotes/:noteid', async (req, res) => {
    try {
      const note = await Note.getNoteById(req.params.noteid);const express = require("express");
      const Note = require("../models/Note");
      const router = express.Router();
      
      router
        // Create a new note for a User route
        .post('/postnotes', async (req, res) => {
          try {
            await Note.createNote(req.body);
            res.status(201).send({ success: "Note created successfully!" });
          } catch (err) {
            res.status(500).send({ message: err.message });
          }
        })
        
      
        // Read a note by ID route
        .get('/getnotes/:noteid', async (req, res) => {
          try {
            const note = await Note.getNoteById(req.params.noteid);
            res.send(note[0]);
          } catch (err) {
            res.status(500).send({ message: err.message });
          }
        })
      
        //Read all notes by  userID route
        .post('/allnotes', async (req, res) => {
          try {
            const userId = req.body.userid;
            const notes = await Note.getAllNotesByUserId(userId);
            res.status(200).json(notes);
          } catch (err) {
            res.status(500).send({ message: err.message });
          }
        })
      
        
      
        // Update a note by ID route
        .put('/updatenotes/:noteid', async (req, res) => {
          try {
            await Note.updateNoteById(req.params.noteid, req.body);
            res.send({ success: "Note updated successfully!" });
          } catch (err) {
            res.status(500).send({ message: err.message });
          }
        })
      
        // Delete a note by ID route
        .delete('/deletenotes/:noteid', async (req, res) => {
          try {
            await Note.deleteNoteById(req.params.noteid);
            res.send({ success: "Note deleted successfully!" });
          } catch (err) {
            res.status(500).send({ message: err.message });
          }
        });
      
      module.exports = router;
      
      res.send(note[0]);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })

  //Read all notes by  userID route
  .post('/allnotes', async (req, res) => {
    try {
      const userId = req.body.userid;
      const notes = await Note.getAllNotesByUserId(userId);
      res.status(200).json(notes);
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })

  

  // Update a note by ID route
  .put('/updatenotes/:noteid', async (req, res) => {
    try {
      await Note.updateNoteById(req.params.noteid, req.body);
      res.send({ success: "Note updated successfully!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  })

  // Delete a note by ID route
  .delete('/deletenotes/:noteid', async (req, res) => {
    try {
      await Note.deleteNoteById(req.params.noteid);
      res.send({ success: "Note deleted successfully!" });
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });

module.exports = router;
