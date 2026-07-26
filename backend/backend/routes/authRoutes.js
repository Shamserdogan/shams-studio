const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const User = require('../models/User');
const { isDbConnected } = require('../config/db');
const { sanitizeString, isValidEmail } = require('../utils/validators');
const { protect } = require('../middleware/authMiddleware');

const JWT_SECRET = () => process.env.JWT_SECRET || 'shams_studio_jwt_secret_key_2026_change_this_in_production';

// Generate JWT Token
const generateToken = (id, role, name, email) => {
  return jwt.sign({ id, role, name, email }, JWT_SECRET(), { expiresIn: '7d' });
};

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  });
  await transporter.sendMail({ from: `${process.env.FROM_NAME} <${process.env.EMAIL_FROM}>`, to: options.email, subject: options.subject, text: options.message });
};

// @route   POST /api/auth/login
router.post('/login', async (req, res, next) => {
  try {
    const email = sanitizeString(req.body.email).toLowerCase();
    const password = sanitizeString(req.body.password);

    if (!email || !password) return res.status(400).json({ success: false, message: 'Please provide email and password' });

    // DB check
    if (!isDbConnected(User)) return res.status(503).json({ success: false, message: 'Database unavailable' });

    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
      return res.json({ success: true, token: generateToken(user._id, user.role, user.name, user.email), user: { id: user._id, name: user.name, email: user.email, role: user.role } });
    }
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  } catch (error) { next(error); }
});

// @route   GET /api/auth/me
router.get('/me', protect, async (req, res) => { res.json({ success: true, user: req.user }); });

// @route   POST /api/auth/verify
router.post('/verify', protect, async (req, res) => { res.json({ success: true, valid: true, user: req.user }); });

// @route   POST /api/auth/forgot-password
router.post('/forgot-password', async (req, res, next) => {
  try {
    if (!isDbConnected(User)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const user = await User.findOne({ email: req.body.email.toLowerCase() });
    if (!user) return res.status(404).json({ success: false, message: 'Email not found' });
    const resetToken = crypto.randomBytes(20).toString('hex');
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;
    await user.save();
    await sendEmail({ email: user.email, subject: 'Password Reset', message: `${process.env.CLIENT_URL}/reset-password/${resetToken}` });
    res.json({ success: true, message: 'Email sent' });
  } catch (error) { next(error); }
});

// @route   PUT /api/auth/reset-password/:token
router.put('/reset-password/:token', async (req, res, next) => {
  try {
    if (!isDbConnected(User)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({ resetPasswordToken, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ success: false, message: 'Invalid or expired token' });
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();
    res.json({ success: true, message: 'Password reset successfully' });
  } catch (error) { next(error); }
});

// @route   PUT /api/auth/change-password
router.put('/change-password', protect, async (req, res, next) => {
  try {
    if (!isDbConnected(User)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const user = await User.findById(req.user.id);
    if (!user || !(await user.matchPassword(req.body.currentPassword))) return res.status(400).json({ success: false, message: 'Incorrect credentials' });
    user.password = req.body.newPassword;
    await user.save();
    res.json({ success: true, message: 'Password updated successfully' });
  } catch (error) { next(error); }
});

// @route   PUT /api/auth/profile
router.put('/profile', protect, async (req, res, next) => {
  try {
    if (!isDbConnected(User)) return res.status(503).json({ success: false, message: 'Database unavailable' });
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ success: false, message: 'User not found' });
    if (req.body.name) user.name = sanitizeString(req.body.name);
    if (req.body.email && isValidEmail(req.body.email)) user.email = sanitizeString(req.body.email).toLowerCase();
    await user.save();
    res.json({ success: true, message: 'Profile updated', user: { id: user._id, name: user.name, email: user.email, role: user.role } });
  } catch (error) { next(error); }
});

module.exports = router;
