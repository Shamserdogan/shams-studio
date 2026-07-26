const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Contact = require('../models/Contact');
const { isDbConnected } = require('../config/db');
const { isValidEmail, sanitizeString } = require('../utils/validators');
const { protect, adminOnly } = require('../middleware/authMiddleware');

/**
 * Safely fetches a Mongoose contact message document by ID or custom _id string
 */
const findContactById = async (id) => {
  if (isDbConnected(Contact)) {
    if (mongoose.Types.ObjectId.isValid(id)) {
      return await Contact.findById(id);
    }
    return await Contact.findOne({ _id: id });
  }
  return null;
};
// @route   POST /api/contact
router.post('/', async (req, res, next) => {
  try {
    console.log('DEBUG: POST /api/contact - Contact Model defined:', !!Contact);
    console.log('DEBUG: POST /api/contact - Contact.db defined:', !!Contact?.db);
    console.log('DEBUG: POST /api/contact - Contact.db.readyState:', Contact?.db?.readyState);
    const name = sanitizeString(req.body.name);
    // ...

    const email = sanitizeString(req.body.email);
    const phone = sanitizeString(req.body.phone);
    const message = sanitizeString(req.body.message);

    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required fields' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    if (!isDbConnected(Contact)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const contact = await Contact.create({
      name,
      email,
      phone: phone || '',
      message,
    });
    console.log('Successfully created contact message:', contact._id);
    res.status(201).json({ success: true, message: 'Thank you for contacting SHAMS STUDIO! Your message has been received.', data: contact });
  } catch (error) {
    console.error('Error in POST /api/contact:', error);
    next(error);
  }
});

// @route   GET /api/contact
router.get('/', protect, adminOnly, async (req, res, next) => {
  try {
    console.log("DIAG: GET /api/contact called");
    const { search, page, limit } = req.query;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const isPaginated = !isNaN(pageNum) && pageNum > 0 && !isNaN(limitNum) && limitNum > 0;

    if (!isDbConnected(Contact)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const query = {};
    if (search) {
      const searchRegex = new RegExp(search.trim(), 'i');
      query.$or = [
        { name: searchRegex },
        { email: searchRegex },
        { phone: searchRegex },
        { message: searchRegex },
      ];
    }

    if (isPaginated) {
      const total = await Contact.countDocuments(query);
      const messages = await Contact.find(query)
        .lean()
        .sort({ createdAt: -1 })
        .skip((pageNum - 1) * limitNum)
        .limit(limitNum);

      return res.json({
        success: true,
        count: messages.length,
        total,
        page: pageNum,
        pages: Math.ceil(total / limitNum),
        data: messages,
      });
    }

    const messages = await Contact.find(query).lean().sort({ createdAt: -1 });
    console.log("DIAG: GET /api/contact returned messages:", messages.length);
    return res.json({ success: true, count: messages.length, data: messages });
  } catch (error) {
    console.error("DIAG: GET /api/contact error:", error);
    next(error);
  }
});

// @route   DELETE /api/contact/:id
router.delete('/:id', protect, adminOnly, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!isDbConnected(Contact)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const contact = await findContactById(id);
    if (!contact) return res.status(404).json({ success: false, message: 'Message not found' });
    await contact.deleteOne();
    res.json({ success: true, message: 'Message deleted successfully' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
