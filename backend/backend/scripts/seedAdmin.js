const mongoose = require('mongoose');
const User = require('../models/User');
const { isDbConnected } = require('../config/db');

mongoose.set('bufferCommands', false);

const seedAdminUsers = async () => {
  try {
    if (!isDbConnected(User)) {
      console.log("MongoDB unavailable, skipping admin seed");
      return;
    }

    const adminEmails = [
      { email: 'shamserdogan926@gmail.com', name: 'Shams Admin 1', role: 'admin' },
      { email: 'shamsuddinmehsood27@gmail.com', name: 'Shams Admin 2', role: 'admin' }
    ];

    for (const admin of adminEmails) {
      const userExists = await User.findOne({ email: admin.email });
      if (!userExists) {
        await User.create({
          ...admin,
          password: 'jananiyi'
        });
        console.log(`Admin user ${admin.email} created.`);
      }
    }
  } catch (error) {
    console.error('Error seeding admin users:', error.message);
  }
};

module.exports = seedAdminUsers;
