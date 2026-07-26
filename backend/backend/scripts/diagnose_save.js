const axios = require('axios');
const mongoose = require('mongoose');
const Portfolio = require('../models/Portfolio');
require('dotenv').config({ path: '.env' });

async function diagnose() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('--- DIAGNOSTIC TRACE START ---');

    // 1. Fetch an existing record
    const doc = await Portfolio.findOne({ title: 'Modern Web Development' }).lean();
    if (!doc) throw new Error('Portfolio record "Modern Web Development" not found');
    const id = doc._id;

    // 2. Construct simulated payload
    const payload = {
      title: doc.title,
      description: doc.description,
      mainVideo: 'https://res.cloudinary.com/test/video/upload/v12345/test.mp4'
    };

    console.log('1. Payload before API request:', JSON.stringify(payload, null, 2));

    // 3. Perform PUT request
    const response = await axios.put(`http://localhost:5000/api/portfolio/${id}`, payload);
    
    console.log('2. API Response received:', JSON.stringify(response.data, null, 2));

    // 4. Verify MongoDB directly
    const savedDoc = await Portfolio.findById(id).lean();
    console.log('3. MongoDB stored document:', JSON.stringify(savedDoc, null, 2));

    await mongoose.disconnect();
    console.log('--- DIAGNOSTIC TRACE END ---');
  } catch (e) {
    console.error('DIAGNOSTIC ERROR:', e.response ? JSON.stringify(e.response.data) : e.message);
  }
}

diagnose();
