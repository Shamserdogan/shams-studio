const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode && res.statusCode !== 200 ? res.statusCode : 500;
  
  console.error(`❌ API Error [${req.method} ${req.url}]:`, err?.message || err);

  res.status(statusCode).json({
    success: false,
    message: err?.message || 'Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : (err?.stack || 'No stack trace'),
  });
};

const notFound = (req, res, next) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.originalUrl}`
  });
};

module.exports = { errorHandler, notFound };
