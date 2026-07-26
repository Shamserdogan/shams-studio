const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = process.env.MONGO_URI;
    
    // Mask password in logs
    const maskedUri = mongoUri ? mongoUri.replace(/:([^@]+)@/, ':****@') : 'undefined';
    console.log(`Connecting to MongoDB with URI: ${maskedUri}`);

    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in environment variables');
    }

    await mongoose.connect(mongoUri, {
      family: 4, // Force IPv4
      serverSelectionTimeoutMS: 5000,
    });
    
    console.log('✅ MongoDB Connected Successfully');
    return true;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    // DO NOT crash, but we need the app to know it's not connected
    return false;
  }
};

/**
 * Checks if Mongoose model is connected to active database
 * @param {Object} model Mongoose model instance
 * @returns {boolean}
 */
const isDbConnected = (model) => {
  const connected = !!(model && model.db && model.db.readyState === 1);
  if (!connected) {
    console.log('DEBUG: isDbConnected returned false.');
    console.log('DEBUG: model defined:', !!model);
    console.log('DEBUG: model.db defined:', !!model?.db);
    console.log('DEBUG: model.db.readyState:', model?.db?.readyState);
  }
  return connected;
};

module.exports = {
  connectDB,
  isDbConnected,
};
