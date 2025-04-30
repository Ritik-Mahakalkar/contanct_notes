const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const contactNoteRoutes = require('./routes/contactNotes');

const app = express();

// Enable CORS for all origins (or specify a specific origin)
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ContactNote', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.use('/api', contactNoteRoutes);

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
