const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Project description is required'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      default: 'Web Development',
    },
    technologies: {
      type: [String],
      default: [],
    },
    tags: {
      type: [String],
      default: [],
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80',
    },
    video: {
      type: String,
      default: '',
    },
    mainImage: { type: String, default: '' },
    mainVideo: { type: String, default: '' },
    previewImage: { type: String, default: '' },
    previewVideo: { type: String, default: '' },
    liveUrl: {
      type: String,
      default: '',
    },
    githubUrl: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

portfolioSchema.index({ createdAt: -1 });
portfolioSchema.index({ category: 1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);
