// Skript na vytvorenie admin užívateľa
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const createAdmin = async () => {
  try {
    // Pripojenie k databáze
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eshop', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB pripojené');

    // Kontrola, či admin už existuje
    const existingAdmin = await User.findOne({ email: 'admin@eshop.sk' });
    if (existingAdmin) {
      console.log('Admin užívateľ už existuje. Zmena role na admin...');
      existingAdmin.role = 'admin';
      await existingAdmin.save();
      console.log('✓ Role zmenená na admin');
    } else {
      // Vytvorenie nového admin užívateľa
      const admin = new User({
        name: 'Admin',
        email: 'admin@eshop.sk',
        password: 'admin123',
        role: 'admin'
      });
      await admin.save();
      console.log('✓ Admin užívateľ vytvorený');
      console.log('Email: admin@eshop.sk');
      console.log('Heslo: admin123');
    }

    await mongoose.connection.close();
    console.log('Hotovo!');
    process.exit(0);
  } catch (error) {
    console.error('Chyba:', error.message);
    process.exit(1);
  }
};

createAdmin();


