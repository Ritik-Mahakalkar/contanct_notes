const mongoose = require('mongoose');

const ContactNoteSchema = new mongoose.Schema({
  contact_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Contact', required: true },
  note_text: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('ContactNote', ContactNoteSchema);
