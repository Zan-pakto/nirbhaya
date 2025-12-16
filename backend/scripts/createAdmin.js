const mongoose = require('mongoose');
const User = require('../models/User');
const dotenv = require('dotenv');

// Load env vars
dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to database
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const email = process.argv[2];
    if (!email) {
      console.log('Usage: node createAdmin.js <email>');
      process.exit(1);
    }

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log(`User with email ${email} not found. Please register first.`);
      process.exit(1);
    }

    // Update role to admin
    user.role = 'admin';
    await user.save();

    console.log(`User ${email} is now an admin!`);
    process.exit(0);
  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
};

createAdmin();

