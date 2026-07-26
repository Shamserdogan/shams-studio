const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const Portfolio = require('../models/Portfolio');
const Service = require('../models/Service');

const migrate = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for migration.");

    // Migrate Portfolio
    const portfolioItems = await Portfolio.find({});
    for (const item of portfolioItems) {
      let updated = false;
      if (!item.mainImage && item.image) { item.mainImage = item.image; updated = true; }
      if (!item.mainVideo && item.video) { item.mainVideo = item.video; updated = true; }
      if (updated) await item.save();
    }
    console.log(`Migrated ${portfolioItems.length} Portfolio items.`);

    // Migrate Services
    const services = await Service.find({});
    for (const item of services) {
      let updated = false;
      if (!item.mainImage && item.image) { item.mainImage = item.image; updated = true; }
      if (!item.mainVideo && item.video) { item.mainVideo = item.video; updated = true; }
      if (updated) await item.save();
    }
    console.log(`Migrated ${services.length} Services.`);

    await mongoose.disconnect();
    console.log("Migration complete.");
  } catch (err) {
    console.error("Migration failed:", err);
  }
};

migrate();
