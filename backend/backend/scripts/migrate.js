const mongoose = require('mongoose');
require('dotenv').config({ path: __dirname + '/../.env' });
const seedPortfolio = require('./seedPortfolio');
const seedServices = require('./seedServices');

const runMigration = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for migration.");

    console.log("Starting Portfolio migration...");
    await seedPortfolio();
    console.log("Portfolio migration complete.");

    console.log("Starting Services migration...");
    await seedServices();
    console.log("Services migration complete.");

    await mongoose.disconnect();
    console.log("Migration finished and disconnected.");
  } catch (error) {
    console.error("Migration failed:", error);
    process.exit(1);
  }
};

runMigration();
