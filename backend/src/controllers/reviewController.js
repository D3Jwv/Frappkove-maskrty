const Review = require('../models/Review');
const Product = require('../models/Product');

// Vytvoriť recenziu
exports.createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    // Kontrola, či užívateľ už hodnotil tento produkt
    const existingReview = await Review.findOne({
      product: productId,
      user: req.user._id
    });

    if (existingReview) {
      return res.status(400).json({ message: 'Už ste hodnotili tento produkt' });
    }

    const review = new Review({
      product: productId,
      user: req.user._id,
      rating,
      comment
    });

    await review.save();
    await review.populate('user', 'name');

    // Aktualizovať priemerné hodnotenie produktu
    await updateProductRating(productId);

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Získať recenzie produktu
exports.getProductReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ product: req.params.productId })
      .populate('user', 'name')
      .sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Aktualizovať recenziu
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({ message: 'Recenzia nebola nájdená' });
    }

    review.rating = req.body.rating || review.rating;
    review.comment = req.body.comment || review.comment;
    await review.save();

    // Aktualizovať priemerné hodnotenie
    await updateProductRating(review.product);

    res.json(review);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Zmazať recenziu
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!review) {
      return res.status(404).json({ message: 'Recenzia nebola nájdená' });
    }

    const productId = review.product;
    await review.deleteOne();

    // Aktualizovať priemerné hodnotenie
    await updateProductRating(productId);

    res.json({ message: 'Recenzia bola zmazaná' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Pomocná funkcia na aktualizáciu priemerného hodnotenia
const updateProductRating = async (productId) => {
  const reviews = await Review.find({ product: productId });
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  await Product.findByIdAndUpdate(productId, {
    averageRating: Math.round(averageRating * 10) / 10,
    reviewCount: reviews.length
  });
};

