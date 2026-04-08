const express = require('express');
const router = express.Router();
const {
  uploadNote,
  getUserNotes,
  getAllNotes,
  incrementDownload,
  deleteNote,
  editNote,
} = require('../controllers/noteController');

// Upload a new note
router.post('/upload', uploadNote);

// Fetch all notes uploaded by a user
router.get('/user/:email', getUserNotes);

// Fetch all notes
router.get('/', getAllNotes);

// Increment download count
router.put('/download/:id', incrementDownload);

// Delete a note
router.delete('/:id', deleteNote);

// Edit note details (title, subject)
router.put('/edit/:id', editNote);

module.exports = router;
