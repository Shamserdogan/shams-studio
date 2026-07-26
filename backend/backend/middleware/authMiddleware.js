const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { isDbConnected } = require('../config/db');

const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.headers['x-auth-token']) {
    token = req.headers['x-auth-token'];
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Not authorized, access token missing' });
  }

  try {
    const secret = process.env.JWT_SECRET || 'shams_studio_jwt_secret_key_2026_change_this_in_production';
    const decoded = jwt.verify(token, secret);

    // If using Mongoose DB, guard the query
    if (isDbConnected(User)) {
      const user = await User.findById(decoded.id).select('-password');
      if (user) {
        req.user = user;
        return next();
      }
    }

    // Fallback or memory token verify
    req.user = {
      id: decoded.id || 'fallback-id',
      name: decoded.name || 'Fallback Admin',
      email: decoded.email || 'admin@fallback.com',
      role: decoded.role || 'admin',
    };
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: 'Not authorized, token invalid or expired' });
  }
};

const adminOnly = (req, res, next) => {
  if (req.user && (req.user.role === 'superadmin' || req.user.role === 'admin')) {
    next();
  } else {
    res.status(403).json({
      success: false,
      message: 'Access denied: Admin permissions required',
    });
  }
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    if (req.user.role === 'superadmin' || roles.includes(req.user.role)) {
      return next();
    }
    return res.status(403).json({
      success: false,
      message: `Access denied: Role '${req.user.role}' lacks permission for this resource`,
    });
  };
};

module.exports = { protect, adminOnly, authorize };
