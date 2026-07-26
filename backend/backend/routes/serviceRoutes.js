const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Service = require('../models/Service');
const { isDbConnected } = require('../config/db');
const { sanitizeString, parseArrayField } = require('../utils/validators');
const { protect, adminOnly } = require('../middleware/authMiddleware');

/**
 * Safely fetches a Mongoose service document by ID or custom _id string
 */
const findServiceById = async (id) => {
  if (isDbConnected(Service)) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await Service.findById(id);
    }
    return await Service.findOne({ _id: id });
  }
  return null;
};

// @route   GET /api/services
router.get('/', async (req, res, next) => {
  try {
    const { search, page, limit } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const isPaginated = !isNaN(pageNum) && pageNum > 0 && !isNaN(limitNum) && limitNum > 0;

    if (!isDbConnected(Service)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const query = {};
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { subtitle: searchRegex },
        { description: searchRegex },
        { highlights: searchRegex },
        { technologies: searchRegex },
      ];
    }

    if (isPaginated) {
      const total = await Service.countDocuments(query);
      const services = await Service.find(query)
        .lean()
        .sort({ createdAt: 1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.json({
        success: true,
        count: services.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        data: services,
      });
    }

    const services = await Service.find(query).lean().sort({ createdAt: 1 });
    return res.json({ success: true, count: services.length, data: services });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/services/:id
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isDbConnected(Service)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const service = await findServiceById(id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    return res.json({ success: true, data: service.toObject ? service.toObject() : service });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/services
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const title = sanitizeString(req.body.title);
    const subtitle = sanitizeString(req.body.subtitle);
    const description = sanitizeString(req.body.description);
    const icon = sanitizeString(req.body.icon);
    const image = sanitizeString(req.body.image);
    const video = sanitizeString(req.body.video);
    const mainImage = sanitizeString(req.body.mainImage);
    const mainVideo = sanitizeString(req.body.mainVideo);
    const previewImage = sanitizeString(req.body.previewImage);
    const previewVideo = sanitizeString(req.body.previewVideo);
    const highlights = parseArrayField(req.body.highlights);
    const technologies = parseArrayField(req.body.technologies);

    if (!title || !description) {
      return res.status(400).json({ success: false, message: 'Title and description are required' });
    }

    if (!isDbConnected(Service)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const service = await Service.create({
      title,
      subtitle: subtitle || '',
      description,
      icon: icon || 'Sparkles',
      image: image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      video: video || '',
      mainImage: mainImage || '',
      mainVideo: mainVideo || '',
      previewImage: previewImage || '',
      previewVideo: previewVideo || '',
      highlights,
      technologies,
    });
    res.status(201).json({ success: true, data: service });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/services/:id
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    console.log("UPDATE BODY", req.body);
    const { id } = req.params;
    const { title, subtitle, description, icon, image, video, mainImage, mainVideo, previewImage, previewVideo, highlights, technologies } = req.body;

    if (!isDbConnected(Service)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    let service = await findServiceById(id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });

    console.log("DATABASE UPDATE DATA (item before)", service);

    const updateData = {};
    if (title !== undefined) updateData.title = sanitizeString(title);
    if (subtitle !== undefined) updateData.subtitle = sanitizeString(subtitle);
    if (description !== undefined) updateData.description = sanitizeString(description);
    if (icon !== undefined) updateData.icon = sanitizeString(icon);
    if (image !== undefined) updateData.image = sanitizeString(image);
    if (video !== undefined) updateData.video = sanitizeString(video);
    if (mainImage != null) updateData.mainImage = sanitizeString(mainImage);
    if (mainVideo != null) updateData.mainVideo = sanitizeString(mainVideo);
    if (previewImage != null) updateData.previewImage = sanitizeString(previewImage);
    if (previewVideo != null) updateData.previewVideo = sanitizeString(previewVideo);
    if (highlights !== undefined) updateData.highlights = parseArrayField(highlights);
    if (technologies !== undefined) updateData.technologies = parseArrayField(technologies);

    const updatedService = await Service.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    console.log("SAVED DOCUMENT", updatedService);
    res.json({ success: true, data: updatedService });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/services/:id
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isDbConnected(Service)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const service = await findServiceById(id);
    if (!service) return res.status(404).json({ success: false, message: 'Service not found' });
    await service.deleteOne();
    res.json({ success: true, message: 'Service removed successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
