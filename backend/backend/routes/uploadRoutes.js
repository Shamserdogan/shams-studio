const express = require('express');
const router = express.Router();
const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const { protect, adminOnly } = require('../middleware/authMiddleware');

// Configure multer memory storage with file type filtering
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 50 * 1024 * 1024, // 50MB max file size
  },
  fileFilter: (req, file, cb) => {
    const allowedMimePrefixes = ['image/', 'video/'];
    const isAllowed = allowedMimePrefixes.some((prefix) => file.mimetype.startsWith(prefix));
    if (isAllowed) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file format. Only image and video files are permitted.'));
    }
  },
});

// Middleware wrapper for Multer error handling
const handleUploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File size limit exceeded (max 50MB)' });
      }
      return res.status(400).json({ success: false, message: `Upload error: ${err.message}` });
    } else if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }
    next();
  });
};

// @route   POST /api/upload
// @desc    Upload image or video file to Cloudinary / Data URI fallback
// @access  Private/Admin
router.post('/', protect, adminOnly, handleUploadMiddleware, async (req, res, next) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' });
    }

    const hasCloudinaryKeys =
      process.env.CLOUDINARY_CLOUD_NAME &&
      process.env.CLOUDINARY_CLOUD_NAME !== 'your_cloudinary_cloud_name' &&
      process.env.CLOUDINARY_API_KEY &&
      process.env.CLOUDINARY_API_SECRET;

    if (hasCloudinaryKeys) {
      // Stream buffer to Cloudinary
      const mimeType = req.file.mimetype;
      const resourceType = mimeType.startsWith('video/') ? 'video' : 'image';

      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'shams_studio_media',
          resource_type: resourceType,
          quality: 'auto',
          fetch_format: 'auto',
        },
        (error, result) => {
          if (error) {
            console.error('Cloudinary upload error:', error);
            return res.status(500).json({
              success: false,
              message: 'Cloudinary upload failed: ' + error.message,
            });
          }

          res.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id,
            resource_type: result.resource_type,
            format: result.format,
            bytes: result.bytes,
          });
        }
      );

      uploadStream.end(req.file.buffer);
    } else {
      // Fallback: Return Data URI for immediate local testing without Cloudinary setup
      const base64 = req.file.buffer.toString('base64');
      const dataUri = `data:${req.file.mimetype};base64,${base64}`;

      res.json({
        success: true,
        url: dataUri,
        isFallbackDataUri: true,
        message: 'File processed successfully. (Note: For Cloudinary cloud storage, set CLOUDINARY_CLOUD_NAME in .env)',
        format: req.file.mimetype.split('/')[1] || 'media',
        bytes: req.file.size,
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;

