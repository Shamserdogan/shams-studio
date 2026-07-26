const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Full content is required'],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    },
    mainImage: { type: String, default: '' },
    mainVideo: { type: String, default: '' },
    previewImage: { type: String, default: '' },
    previewVideo: { type: String, default: '' },
    category: {
      type: String,
      default: 'General',
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    author: {
      type: String,
      default: 'SHAMS STUDIO',
    },
  },
  { timestamps: true }
);

blogSchema.index({ createdAt: -1 });
blogSchema.index({ category: 1 });

module.exports = mongoose.model('Blog', blogSchema);
