const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    subtitle: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
    },
    icon: {
      type: String,
      default: 'Sparkles',
    },
    image: {
      type: String,
      default: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1000&q=80',
    },
    video: {
      type: String,
      default: '',
    },
    mainImage: { type: String, default: '' },
    mainVideo: { type: String, default: '' },
    previewImage: { type: String, default: '' },
    previewVideo: { type: String, default: '' },
    highlights: {
      type: [String],
      default: [],
    },
    technologies: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

serviceSchema.index({ createdAt: 1 });

module.exports = mongoose.model('Service', serviceSchema);
