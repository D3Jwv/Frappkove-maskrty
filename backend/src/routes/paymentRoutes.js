const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const stripeService = require('../services/stripeService');
const { authenticate } = require('../middleware/auth');

// Chránené routes
router.post('/create-intent', authenticate, paymentController.createPaymentIntent);
router.post('/confirm', authenticate, paymentController.confirmPayment);

// Webhook (bez autentifikácie - Stripe podpis)
router.post('/webhook', express.raw({ type: 'application/json' }), stripeService.handleWebhook);

module.exports = router;

