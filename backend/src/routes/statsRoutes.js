const express = require('express');
const router = express.Router();
const statsController = require('../controllers/statsController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Admin routes
router.get('/', authenticate, isAdmin, statsController.getStats);

module.exports = router;

