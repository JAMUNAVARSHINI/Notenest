const Note = require('../models/Note');

// @desc    Upload a new note
// @route   POST /api/notes/upload
// @access  Public (or Protected if needed)
const uploadNote = async (req, res) => {
  try {
    const { title, subject, userEmail } = req.body;

    if (!title || !subject || !userEmail) {
      return res.status(400).json({ message: 'Please provide title, subject, and userEmail' });
    }

    const note = await Note.create({
      title,
      subject,
      userEmail,
    });

    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all notes uploaded by a user
// @route   GET /api/notes/user/:email
// @access  Public
const getUserNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userEmail: req.params.email }).sort({ uploadDate: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Get all notes
// @route   GET /api/notes
// @access  Public
const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ uploadDate: -1 });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Increment download count
// @route   PUT /api/notes/download/:id
// @access  Public
const incrementDownload = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    note.downloads += 1;
    await note.save();

    res.status(200).json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Public (should probably be protected)
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    await note.deleteOne();
    res.status(200).json({ message: 'Note deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

// @desc    Edit note details (title, subject)
// @route   PUT /api/notes/edit/:id
// @access  Public (should probably be protected)
const editNote = async (req, res) => {
  try {
    const { title, subject } = req.body;
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    if (title) note.title = title;
    if (subject) note.subject = subject;

    const updatedNote = await note.save();
    res.status(200).json(updatedNote);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error: error.message });
  }
};

module.exports = {
  uploadNote,
  getUserNotes,
  getAllNotes,
  incrementDownload,
  deleteNote,
  editNote,
};
