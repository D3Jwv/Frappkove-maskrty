const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController');
const { authenticate, isAdmin } = require('../middleware/auth');

// Admin routes
router.get('/', authenticate, isAdmin, adminUserController.getAllUsers);
router.get('/:id', authenticate, isAdmin, adminUserController.getUserById);
router.put('/:id', authenticate, isAdmin, adminUserController.updateUser);
router.delete('/:id', authenticate, isAdmin, adminUserController.deleteUser);

module.exports = router;

