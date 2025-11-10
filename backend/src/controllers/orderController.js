const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');
const emailService = require('../services/emailService');

// Vytvoriť objednávku
exports.createOrder = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    // Validovať a vypočítať celkovú sumu
    let totalAmount = 0;
    const orderItems = [];

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ 
          message: `Produkt ${product?.name || item.productId} nie je dostupný v požadovanom množstve` 
        });
      }

      orderItems.push({
        product: product._id,
        quantity: item.quantity,
        price: product.price
      });

      totalAmount += product.price * item.quantity;
    }

    const order = new Order({
      user: req.user._id,
      items: orderItems,
      totalAmount,
      shippingAddress,
      paymentMethod
    });

    await order.save();

    // Znížiť stock produktov
    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity }
      });
    }

    await order.populate('items.product', 'name image');
    await order.populate('user', 'name email');
    
    // Odoslať email notifikáciu
    if (order.user && order.user.email) {
      emailService.sendOrderConfirmation(order, order.user).catch(err => {
        console.error('Chyba pri odosielaní emailu:', err);
      });
    }
    
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Získať všetky objednávky užívateľa
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name image price')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Získať jednu objednávku
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.product', 'name image price')
      .populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Objednávka nebola nájdená' });
    }

    // Kontrola, či užívateľ vlastní objednávku alebo je admin
    if (order.user._id.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Prístup zamietnutý' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aktualizovať status objednávky (admin)
exports.updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const oldOrder = await Order.findById(req.params.id).populate('user', 'name email');
    const oldStatus = oldOrder ? oldOrder.status : null;
    
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    ).populate('items.product', 'name image').populate('user', 'name email');

    if (!order) {
      return res.status(404).json({ message: 'Objednávka nebola nájdená' });
    }

    // Odoslať email notifikáciu pri zmene statusu
    if (order.user && order.user.email && oldStatus !== status) {
      emailService.sendOrderStatusUpdate(order, order.user, oldStatus).catch(err => {
        console.error('Chyba pri odosielaní emailu:', err);
      });
    }

    res.json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Získať všetky objednávky (admin)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name image')
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

