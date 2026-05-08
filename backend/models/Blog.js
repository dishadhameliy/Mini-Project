const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please provide a title'],
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: [true, 'Please provide content']
  },
  image: {
    type: String,
    default: ''
  },
  pdf: {
    type: String,
    default: ''
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true
});

// Add text index for search
blogSchema.index({ title: 'text', content: 'text', category: 'text' });

module.exports = mongoose.model('Blog', blogSchema);
