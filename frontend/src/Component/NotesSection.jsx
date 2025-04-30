import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';  // Import toast and ToastContainer
import 'react-toastify/dist/ReactToastify.css';  // Import toast CSS for styling
import { useParams } from 'react-router-dom';

const NotesSection = () => {
  const { contactId } = useParams(); // Get contactId from the URL

  const [notes, setNotes] = useState([]);  // State to hold notes
  const [newNote, setNewNote] = useState(''); // State for new note input

  // Fetch notes when component mounts or contactId changes
  useEffect(() => {
    if (!contactId) {
      toast.error('Invalid contact ID');
      return;
    }

    fetch(`http://localhost:5000/api/contacts/${contactId}/notes`)
      .then(res => res.json())
      .then(setNotes)
      .catch(() => toast.error('Failed to load notes.'));
  }, [contactId]);

  // Add a new note
  const addNote = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/contacts/${contactId}/notes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ note_text: newNote }), // Send new note in the request body
      });
      if (res.ok) {
        const addedNote = await res.json();
        setNotes([addedNote, ...notes]); // Update notes with the new note
        setNewNote(''); // Clear input field
        toast.success('Note added successfully!');  // Success message
      } else {
        toast.error('Failed to add note.');  // Error message if request fails
      }
    } catch {
      toast.error('An error occurred while adding the note.');  // General error message
    }
  };

  // Delete a note
  const deleteNote = async (noteId) => {
    try {
      const res = await fetch(`http://localhost:5000/api/notes/${noteId}`, { method: 'DELETE' });
      if (res.ok) {
        setNotes(notes.filter(note => note._id !== noteId)); // Remove deleted note from state
        toast.success('Note deleted successfully!');  // Success message
      } else {
        toast.error('Failed to delete note.');  // Error message if request fails
      }
    } catch {
      toast.error('An error occurred while deleting the note.');  // General error message
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-xl shadow-xl transition-all duration-500">
      <h3 className="text-3xl font-bold text-center text-blue-800 mb-6 animate-fade-in transition duration-300">
        📝 Contact Notes
      </h3>

      {/* New Note Section */}
      <div className="flex gap-3 mb-6">
        <input
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)} // Update newNote on input change
          className="border-2 border-blue-400 rounded-lg p-3 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
          placeholder="Write a new note..."
        />
        <button
          onClick={addNote}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-medium px-5 py-3 rounded-lg hover:opacity-90 transition duration-300 ease-in-out shadow-md hover:shadow-lg"
        >
          Add Note
        </button>
      </div>

      {/* Notes List */}
      <ul className="space-y-6">
        {notes.map(note => (
          <li
            key={note._id}
            className="bg-white shadow-lg p-5 rounded-xl flex justify-between items-start hover:shadow-2xl transition-all duration-300 ease-in-out"
          >
            <div className="flex flex-col">
              <p className="text-gray-800 text-lg font-medium">{note.note_text}</p>
              <small className="text-gray-400 text-sm mt-2">
                {new Date(note.created_at).toLocaleString()}
              </small>
            </div>
            <button
              onClick={() => deleteNote(note._id)}
              className="text-sm text-red-500 hover:text-red-700 transition duration-200"
            >
              ✖
            </button>
          </li>
        ))}
      </ul>

      {/* Toast Notifications */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar newestOnTop />
    </div>
  );
};

export default NotesSection;
