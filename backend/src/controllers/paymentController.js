const stripeService = require('../services/stripeService');
const Order = require('../models/Order');

// Vytvoriť payment intent
exports.createPaymentIntent = async (req, res) => {
  try {
    const { orderId } = req.body;
    
    const order = await Order.findById(orderId).populate('user');
    if (!order) {
      return res.status(404).json({ message: 'Objednávka nebola nájdená' });
    }

    // Kontrola, či užívateľ vlastní objednávku
    if (order.user._id.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Prístup zamietnutý' });
    }

    const { clientSecret, paymentIntentId } = await stripeService.createPaymentIntent(
      order.totalAmount,
      'eur',
      {
        orderId: order._id.toString(),
        userId: req.user._id.toString()
      }
    );

    // Uložiť paymentIntentId do objednávky
    order.paymentIntentId = paymentIntentId;
    await order.save();

    res.json({ clientSecret, paymentIntentId });
  } catch (error) {
    console.error('Payment controller error:', error);
    res.status(500).json({ 
      message: error.message || 'Chyba pri vytváraní platobného intentu',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

// Potvrdiť platbu
exports.confirmPayment = async (req, res) => {
  try {
    const { paymentIntentId, orderId } = req.body;

    const paymentStatus = await stripeService.confirmPayment(paymentIntentId);

    if (paymentStatus.paid) {
      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'paid';
        order.paymentMethod = 'card';
        await order.save();
      }
    }

    res.json(paymentStatus);
  } catch (error) {
    console.error('Payment confirm error:', error);
    res.status(500).json({ 
      message: error.message || 'Chyba pri potvrdení platby',
      error: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
  }
};

