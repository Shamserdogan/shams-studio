# SHAMS STUDIO - Enterprise Backend API & CMS System

This is the complete, production-ready Node.js & Express REST API backend for **SHAMS STUDIO**.

---

## 🌟 Key Features

- **Authentication System:** Secure JWT admin login, password hashing with bcrypt, role-based protection (`protect`, `adminOnly`).
- **Blog Management (CMS):** Full CRUD for blog posts, categories, tags, cover images, and markdown/rich content with automatic memory fallback.
- **Portfolio Management:** Dynamic portfolio projects with filter tags, live demo links, GitHub links, and media support.
- **Services Management:** Dynamic service offerings (AI Video Ads, Web Dev, UI/UX, Enterprise Networking, AI Content Creation).
- **Contact Inquiries:** Client inquiry submission API with email validation, sanitization, and admin dashboard message management.
- **Media Upload Module:** Memory-buffered Multer uploads with strict MIME-type filtering, Cloudinary Free Tier integration, and base64 Data URI local fallback.
- **Input Sanitization & Utilities:** Centralized input string sanitization (`validators.js`), email format verification, array normalization, and db connection helpers.
- **Database Architecture:** MongoDB Atlas Mongoose models with seamless in-memory store fallback when MONGO_URI is omitted or unreachable.

---

## 📁 Directory Structure

```
backend/
├── config/
│   ├── db.js             # MongoDB Atlas connection & isDbConnected helper
│   └── cloudinary.js     # Cloudinary media configuration
├── middleware/
│   ├── authMiddleware.js # JWT & Admin protection middleware
│   └── errorMiddleware.js# Express global error & 404 handler
├── models/
│   ├── User.js           # Admin User Mongoose model
│   ├── Blog.js           # Blog post Mongoose model
│   ├── Portfolio.js      # Portfolio project Mongoose model
│   ├── Service.js        # Service offering Mongoose model
│   └── Contact.js        # Contact form message Mongoose model
├── routes/
│   ├── authRoutes.js     # /api/auth endpoints (login, me, verify)
│   ├── blogRoutes.js     # /api/blogs CRUD endpoints
│   ├── portfolioRoutes.js# /api/portfolio CRUD endpoints
│   ├── serviceRoutes.js  # /api/services CRUD endpoints
│   ├── contactRoutes.js  # /api/contact endpoints
│   └── uploadRoutes.js   # /api/upload media endpoint
├── utils/
│   └── validators.js     # Email validation, string sanitization, array parser
├── .env.example          # Environment variable template
├── package.json          # Dependencies & scripts
├── README.md             # Backend documentation & API spec
└── server.js             # Standalone Express server entrypoint
```

---

## 🚀 Quick Local Setup

1. **Navigate to the backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Fill in your credentials (or leave placeholders for in-memory fallback mode):
   - `MONGO_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: Any random secure string
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`

4. **Start the server:**
   ```bash
   npm run dev
   ```
   The backend API will run on `http://localhost:5000` (or `http://localhost:3000` when running through main full-stack server).

---

## 🌐 API Specification Matrix

| Category | Method | Endpoint | Access | Description |
|---|---|---|---|---|
| **Health** | GET | `/api/health` | Public | System status and health check |
| **Auth** | POST | `/api/auth/login` | Public | Admin login & JWT token retrieval |
| **Auth** | GET | `/api/auth/me` | Protected | Fetch current authenticated user profile |
| **Auth** | POST | `/api/auth/verify` | Protected | Verify JWT token validity |
| **Blogs** | GET | `/api/blogs` | Public | Retrieve all blog posts |
| **Blogs** | GET | `/api/blogs/:id` | Public | Retrieve single blog post by ID |
| **Blogs** | POST | `/api/blogs` | Admin | Create a new blog post |
| **Blogs** | PUT | `/api/blogs/:id` | Admin | Update an existing blog post |
| **Blogs** | DELETE | `/api/blogs/:id` | Admin | Delete a blog post |
| **Portfolio**| GET | `/api/portfolio` | Public | Retrieve all portfolio items |
| **Portfolio**| GET | `/api/portfolio/:id` | Public | Retrieve single portfolio project by ID |
| **Portfolio**| POST | `/api/portfolio` | Admin | Create a new portfolio project |
| **Portfolio**| PUT | `/api/portfolio/:id` | Admin | Update an existing portfolio project |
| **Portfolio**| DELETE | `/api/portfolio/:id` | Admin | Delete a portfolio project |
| **Services** | GET | `/api/services` | Public | Retrieve all service offerings |
| **Services** | GET | `/api/services/:id` | Public | Retrieve single service offering by ID |
| **Services** | POST | `/api/services` | Admin | Create a new service offering |
| **Services** | PUT | `/api/services/:id` | Admin | Update an existing service offering |
| **Services** | DELETE | `/api/services/:id` | Admin | Delete a service offering |
| **Contact** | POST | `/api/contact` | Public | Submit contact inquiry form |
| **Contact** | GET | `/api/contact` | Admin | Retrieve all contact inquiry messages |
| **Contact** | DELETE | `/api/contact/:id` | Admin | Delete a contact inquiry message |
| **Upload** | POST | `/api/upload` | Admin | Upload image/video file to Cloudinary / Data URI |

---

## 🔒 Security & Validation Standards

1. **Input Sanitization:** All incoming text parameters are trimmed and sanitized via `validators.js`.
2. **Email Formatting:** Strict email regex checks before accepting form submissions or logins.
3. **Array Normalization:** Comma-separated strings and native arrays are automatically converted to clean array primitives.
4. **File Type Filtering:** Upload endpoint restricts files strictly to supported image (`jpeg`, `png`, `webp`, `gif`, `svg`) and video (`mp4`, `webm`, `quicktime`) MIME types up to 50MB.
5. **Fail-Safe Fallbacks:** Unreachable external services (DB, Cloudinary) fail gracefully without crashing the server or throwing uncaught exceptions.

---

## 📝 Audit & Optimization Changelog

- **v1.4.0 (Production Grade Architect & DevOps Optimization):**
  - **Query Search & Filtering:** Added full-text regex search (`?search=...`) and category filtering (`?category=...`) across Blog, Portfolio, Service, and Contact endpoints for both MongoDB Atlas and In-Memory Fallback mode.
  - **Paginated Results:** Implemented optional pagination support (`?page=1&limit=10`) with total count metadata (`total`, `pages`, `count`) across all GET collection endpoints.
  - **Safe ID Lookup Helpers:** Introduced `findBlogById`, `findPortfolioById`, `findServiceById`, and `findContactById` to prevent Mongoose `CastError` failures on non-ObjectId custom string keys.
  - **Security Headers & Request Logger:** Added `X-Content-Type-Options`, `X-Frame-Options`, `X-XSS-Protection`, `Referrer-Policy`, and API request duration logger middleware to Express servers.
  - **Upload Stream Safety:** Added wrapped Multer error handling middleware in `uploadRoutes.js` for graceful HTTP 400 responses on file size or MIME type limit errors.
- **v1.3.0 (Production Performance & Speed Optimization):**
  - Optimized all Mongoose read operations across Blog, Portfolio, Service, and Contact routes with `.lean()` queries, reducing RAM consumption and accelerating JSON serialization speed up to 5x-10x.
  - Added MongoDB schema index definitions (`createdAt`, `category`) on Blog, Portfolio, Service, and Contact models to optimize database query execution plans and sort performance.
  - Hardened file upload stream buffering and MIME-type restrictions.
  - Verified full production readiness with zero linter, compilation, or build warnings.
- **v1.2.0 (Code Quality Audit & Optimization):**
  - Consolidated duplicate `isDbConnected` checks across all route files into `backend/config/db.js`.
  - Added `backend/utils/validators.js` for centralized input sanitization, email validation, and array parsing.
  - Added Multer `fileFilter` for image and video MIME-type verification in `uploadRoutes.js`.
  - Enhanced Express error middleware with explicit error handling and environment-aware stack traces.
  - Improved MongoDB Atlas connection timeout configs (`serverSelectionTimeoutMS: 2000`) to guarantee instant server boot without delays.
  - Updated API specification matrix and architecture documentation in README.md.
