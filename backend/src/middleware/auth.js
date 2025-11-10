const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware pre overenie JWT tokenu
const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'Prístup zamietnutý. Žiadny token.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    const user = await User.findById(decoded.userId).select('-password');
    
    if (!user) {
      return res.status(401).json({ message: 'Užívateľ nebol nájdený.' });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Neplatný token.' });
  }
};

// Middleware pre overenie admin role
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Prístup zamietnutý. Vyžaduje sa admin role.' });
  }
};

module.exports = { authenticate, isAdmin };

