const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
const { isDbConnected } = require('../config/db');
const { sanitizeString, parseArrayField } = require('../utils/validators');
const { protect, adminOnly } = require('../middleware/authMiddleware');

/**
 * Safely fetches a Mongoose portfolio document by ID or custom _id string
 */
const findPortfolioById = async (id) => {
  if (isDbConnected(Portfolio)) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await Portfolio.findById(id);
    }
    return await Portfolio.findOne({ _id: id });
  }
  return null;
};

// @route   GET /api/portfolio
router.get('/', async (req, res, next) => {
  try {
    const { search, category, page, limit } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const isPaginated = !isNaN(pageNum) && pageNum > 0 && !isNaN(limitNum) && limitNum > 0;

    if (!isDbConnected(Portfolio)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const query = {};
    if (category) {
      query.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { category: searchRegex },
        { technologies: searchRegex },
      ];
    }

    if (isPaginated) {
      const total = await Portfolio.countDocuments(query);
      const items = await Portfolio.find(query)
        .lean()
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.json({
        success: true,
        count: items.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        data: items,
      });
    }

    const items = await Portfolio.find(query).lean().sort({ createdAt: -1 });
    return res.json({ success: true, count: items.length, data: items });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/portfolio/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isDbConnected(Portfolio)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const item = await findPortfolioById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    return res.json({ success: true, data: item.toObject ? item.toObject() : item });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/portfolio
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    console.log('DEBUG: Backend POST /api/portfolio body:', req.body);
    const title = sanitizeString(req.body.title);
    const description = sanitizeString(req.body.description);
    const category = sanitizeString(req.body.category);
    const image = sanitizeString(req.body.image);
    const video = sanitizeString(req.body.video);
    const mainImage = sanitizeString(req.body.mainImage);
    const mainVideo = sanitizeString(req.body.mainVideo);
    const previewImage = sanitizeString(req.body.previewImage);
    const previewVideo = sanitizeString(req.body.previewVideo);
    const liveUrl = sanitizeString(req.body.liveUrl);
    const githubUrl = sanitizeString(req.body.githubUrl);
    const technologies = parseArrayField(req.body.technologies);

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    if (!isDbConnected(Portfolio)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const item = await Portfolio.create({
      title,
      description,
      category: category || 'Web Development',
      technologies,
      image: image || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      video: video || '',
      mainImage: mainImage || '',
      mainVideo: mainVideo || '',
      previewImage: previewImage || '',
      previewVideo: previewVideo || '',
      liveUrl: liveUrl || '',
      githubUrl: githubUrl || '',
    });
    console.log('DEBUG: Portfolio record saved:', item);
    res.status(201).json({ success: true, data: item });
  } catch (error) {
    console.error('DEBUG: Portfolio POST error:', error);
    next(error);
  }
});

// @route   PUT /api/portfolio/:id
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    console.log("UPDATE BODY", req.body);
    const { id } = req.params;
    const { title, description, category, technologies, tags, image, video, mainImage, mainVideo, previewImage, previewVideo, liveUrl, githubUrl } = req.body;

    if (!isDbConnected(Portfolio)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    let item = await findPortfolioById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio project not found' });

    console.log("DATABASE UPDATE DATA (item before)", item);

    const updateData = {};
    if (title !== undefined) updateData.title = sanitizeString(title);
    if (description !== undefined) updateData.description = sanitizeString(description);
    if (category !== undefined) updateData.category = sanitizeString(category);
    if (technologies !== undefined) updateData.technologies = parseArrayField(technologies);
    if (tags !== undefined) updateData.tags = parseArrayField(tags);
    if (image !== undefined) updateData.image = sanitizeString(image);
    if (video !== undefined) updateData.video = sanitizeString(video);
    if (mainImage !== undefined) updateData.mainImage = sanitizeString(mainImage);
    if (mainVideo !== undefined) updateData.mainVideo = sanitizeString(mainVideo);
    if (previewImage !== undefined) updateData.previewImage = sanitizeString(previewImage);
    if (previewVideo !== undefined) updateData.previewVideo = sanitizeString(previewVideo);
    if (liveUrl !== undefined) updateData.liveUrl = sanitizeString(liveUrl);
    if (githubUrl !== undefined) updateData.githubUrl = sanitizeString(githubUrl);

    const updatedItem = await Portfolio.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    
    console.log("SAVED DOCUMENT", updatedItem);
    res.json({ success: true, data: updatedItem });
  } catch (error) {
    console.error('DEBUG: Portfolio PUT error:', error);
    next(error);
  }
});

// @route   DELETE /api/portfolio/:id
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isDbConnected(Portfolio)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const item = await findPortfolioById(id);
    if (!item) return res.status(404).json({ success: false, message: 'Portfolio project not found' });
    await item.deleteOne();
    res.json({ success: true, message: 'Portfolio project deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
