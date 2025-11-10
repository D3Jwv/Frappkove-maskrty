const User = require('../models/User');
const Product = require('../models/Product');

// Pridať do wishlistu
exports.addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = await User.findById(req.user._id);

    if (user.wishlist.includes(productId)) {
      return res.status(400).json({ message: 'Produkt už je v wishliste' });
    }

    user.wishlist.push(productId);
    await user.save();

    res.json({ message: 'Produkt pridaný do wishlistu', wishlist: user.wishlist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Odstrániť z wishlistu
exports.removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user._id);

    user.wishlist = user.wishlist.filter(
      id => id.toString() !== productId
    );
    await user.save();

    res.json({ message: 'Produkt odstránený z wishlistu', wishlist: user.wishlist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Získať wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist');
    res.json(user.wishlist);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

