const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const Portfolio = require('../models/Portfolio');
const Service = require('../models/Service');
const Contact = require('../models/Contact');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// @route   GET /api/dashboard/stats
// @desc    Get dashboard summary statistics
// @access  Private/Admin
router.get('/stats', protect, adminOnly, async (req, res, next) => {
  try {
    const [totalBlogs, totalPortfolio, totalServices, totalContacts] = await Promise.all([
      Blog.countDocuments(),
      Portfolio.countDocuments(),
      Service.countDocuments(),
      Contact.countDocuments(),
    ]);

    res.json({
      success: true,
      data: {
        totalBlogs,
        totalPortfolio,
        totalServices,
        totalContacts,
        totalVisitors: 1250, // Placeholder
        totalPageViews: 5430, // Placeholder
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
