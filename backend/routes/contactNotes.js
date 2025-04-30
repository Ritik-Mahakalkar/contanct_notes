const express = require('express');
const router = express.Router();
const ContactNote = require('../models/ContactNote');

// Add a note for a contact
router.post('/contacts/:id/notes', async (req, res) => {
  try {
    const { note_text } = req.body;
    const note = await ContactNote.create({
      contact_id: req.params.id,
      note_text,
    });
    res.status(201).json(note);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all notes for a contact
router.get('/contacts/:id/notes', async (req, res) => {
  try {
    const notes = await ContactNote.find({ contact_id: req.params.id }).sort({ created_at: -1 });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a specific note
router.delete('/notes/:noteId', async (req, res) => {
  try {
    await ContactNote.findByIdAndDelete(req.params.noteId);
    res.json({ message: 'Note deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
