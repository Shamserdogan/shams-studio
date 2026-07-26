const mongoose = require('mongoose');
const Service = require('./models/Service');
require('dotenv').config({ path: './backend/.env' });

async function inspectService() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const service = await Service.findOne().lean();
    if (service) {
      console.log('--- MONGO DB PERSPECTIVE ---');
      console.log('ID:', service._id);
      console.log('mainImage:', service.mainImage);
      console.log('mainVideo:', service.mainVideo);
      console.log('previewImage:', service.previewImage);
      console.log('previewVideo:', service.previewVideo);
    } else {
      console.log('No services found.');
    }
    await mongoose.disconnect();
  } catch (e) {
    console.error('ERROR:', e.message);
  }
}
inspectService();
