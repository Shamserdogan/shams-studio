const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Blog = require('../models/Blog');
const { isDbConnected } = require('../config/db');
const { sanitizeString, parseArrayField } = require('../utils/validators');
const { protect, adminOnly } = require('../middleware/authMiddleware');

/**
 * Safely fetches a Mongoose document by ID or custom _id string without throwing CastError
 */
const findBlogById = async (id) => {
  if (isDbConnected(Blog)) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await Blog.findById(id);
    }
    return await Blog.findOne({ _id: id });
  }
  return null;
};

// @route   GET /api/blogs
// @desc    Get all blogs (supports ?search=..., ?category=..., ?page=..., ?limit=...)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { search, category, page, limit } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const isPaginated = !isNaN(pageNum) && pageNum > 0 && !isNaN(limitNum) && limitNum > 0;

    if (!isDbConnected(Blog)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const query = {};
    if (category) {
      query.category = { $regex: new RegExp(`^${category.trim()}$`, 'i') };
    }
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { title: searchRegex },
        { description: searchRegex },
        { content: searchRegex },
        { category: searchRegex },
      ];
    }

    if (isPaginated) {
      const total = await Blog.countDocuments(query);
      const blogs = await Blog.find(query)
        .lean()
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.json({
        success: true,
        count: blogs.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        data: blogs,
      });
    }

    const blogs = await Blog.find(query).lean().sort({ createdAt: -1 });
    return res.json({ success: true, count: blogs.length, data: blogs });
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/blogs/:id
// @desc    Get single blog by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isDbConnected(Blog)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const blog = await findBlogById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    res.json({ success: true, data: blog.toObject ? blog.toObject() : blog });
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/blogs
// @desc    Create a new blog
// @access  Private/Admin
router.post('/', protect, adminOnly, async (req, res, next) => {
  try {
    const title = sanitizeString(req.body.title);
    const description = sanitizeString(req.body.description);
    const content = sanitizeString(req.body.content);
    const image = sanitizeString(req.body.image);
    const mainImage = sanitizeString(req.body.mainImage);
    const mainVideo = sanitizeString(req.body.mainVideo);
    const previewImage = sanitizeString(req.body.previewImage);
    const previewVideo = sanitizeString(req.body.previewVideo);
    const category = sanitizeString(req.body.category);
    const author = sanitizeString(req.body.author);
    const tags = parseArrayField(req.body.tags);

    if (!title || !description || !content) {
      return res.status(400).json({ success: false, message: 'Title, description, and content are required' });
    }

    if (!isDbConnected(Blog)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const blog = await Blog.create({
      title,
      description,
      content,
      image: image || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
      mainImage: mainImage || '',
      mainVideo: mainVideo || '',
      previewImage: previewImage || '',
      previewVideo: previewVideo || '',
      category: category || 'General',
      tags,
      author: author || 'SHAMS STUDIO',
    });
    res.status(201).json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/blogs/:id
// @desc    Update blog
// @access  Private/Admin
router.put('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, description, content, image, mainImage, mainVideo, previewImage, previewVideo, category, tags, author } = req.body;

    if (!isDbConnected(Blog)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const updateData = {};
    if (title !== undefined) updateData.title = sanitizeString(title);
    if (description !== undefined) updateData.description = sanitizeString(description);
    if (content !== undefined) updateData.content = sanitizeString(content);
    if (image !== undefined) updateData.image = sanitizeString(image);
    if (mainImage != null) updateData.mainImage = sanitizeString(mainImage);
    if (mainVideo != null) updateData.mainVideo = sanitizeString(mainVideo);
    if (previewImage != null) updateData.previewImage = sanitizeString(previewImage);
    if (previewVideo != null) updateData.previewVideo = sanitizeString(previewVideo);
    if (category !== undefined) updateData.category = sanitizeString(category);
    if (tags !== undefined) updateData.tags = parseArrayField(tags);
    if (author !== undefined) updateData.author = sanitizeString(author);

    const updatedBlog = await Blog.findByIdAndUpdate(id, { $set: updateData }, { new: true });
    if (!updatedBlog) return res.status(404).json({ success: false, message: 'Blog not found' });
    
    res.json({ success: true, data: updatedBlog });
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/blogs/:id
// @desc    Delete blog
// @access  Private/Admin
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isDbConnected(Blog)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    
    const blog = await findBlogById(id);
    if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
    await blog.deleteOne();
    res.json({ success: true, message: 'Blog removed successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
