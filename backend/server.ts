import express from 'express';
import path from 'path';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { createServer as createViteServer } from 'vite';
import { createRequire } from 'module';

dotenv.config();

const require = createRequire(import.meta.url);

// Require backend route handlers
const authRoutes = require('./backend/routes/authRoutes.js');
const blogRoutes = require('./backend/routes/blogRoutes.js');
const portfolioRoutes = require('./backend/routes/portfolioRoutes.js');
const serviceRoutes = require('./backend/routes/serviceRoutes.js');
const contactRoutes = require('./backend/routes/contactRoutes.js');
const uploadRoutes = require('./backend/routes/uploadRoutes.js');

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Attempt MongoDB Atlas connection if MONGO_URI is set and valid
  const mongoUri = process.env.MONGO_URI;
  const isPlaceholderOrLocal = !mongoUri || 
    mongoUri.includes('<username>') || 
    mongoUri.includes('YOUR_MONGODB_URI') || 
    mongoUri.includes('127.0.0.1') || 
    mongoUri.includes('localhost');

  if (mongoUri && !isPlaceholderOrLocal) {
    try {
      await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 2000 });
      console.log('✅ MongoDB Atlas connected successfully in full-stack server');
    } catch (err: any) {
      console.warn('ℹ️ Running server with in-memory fallback store (MongoDB Atlas unavailable):', err.message);
    }
  } else {
    console.log('ℹ️ Running server with in-memory store. Set valid MONGO_URI in .env to connect to real MongoDB Atlas.');
  }

  // Middleware
  app.use(cors({ origin: true, credentials: true }));
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true, limit: '50mb' }));

  // Security headers middleware
  app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    res.setHeader('X-DNS-Prefetch-Control', 'off');
    next();
  });

  // Request logger middleware
  app.use((req, res, next) => {
    const start = Date.now();
    res.on('finish', () => {
      const duration = Date.now() - start;
      if (req.originalUrl && req.originalUrl.startsWith('/api')) {
        console.log(`[API] ${req.method} ${req.originalUrl} - ${res.statusCode} (${duration}ms)`);
      }
    });
    next();
  });

  // API Routes
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      service: 'SHAMS STUDIO Full-Stack App',
      timestamp: new Date().toISOString(),
      mongoConnected: mongoose.connection.readyState === 1,
    });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/blogs', blogRoutes);
  app.use('/api/portfolio', portfolioRoutes);
  app.use('/api/services', serviceRoutes);
  app.use('/api/contact', contactRoutes);
  app.use('/api/upload', uploadRoutes);

  // Vite development middleware or static production serving
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 SHAMS STUDIO Full-Stack App listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
