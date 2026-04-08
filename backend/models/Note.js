const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject'],
  },
  uploadDate: {
    type: Date,
    default: Date.now,
  },
  downloads: {
    type: Number,
    default: 0,
  },
  rating: {
    type: Number,
    default: 0,
  },
  userEmail: {
    type: String,
    required: [true, 'Please add an email'],
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Note', noteSchema);
