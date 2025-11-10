const Product = require('../models/Product');

// Získať všetky produkty
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sortBy, page = 1, limit = 20 } = req.query;
    const query = { active: true };
    
    if (category) {
      query.category = category;
    }
    
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseFloat(minPrice);
      if (maxPrice) query.price.$lte = parseFloat(maxPrice);
    }

    // Triedenie
    let sortOption = { createdAt: -1 };
    if (sortBy === 'price-asc') sortOption = { price: 1 };
    if (sortBy === 'price-desc') sortOption = { price: -1 };
    if (sortBy === 'name-asc') sortOption = { name: 1 };
    if (sortBy === 'name-desc') sortOption = { name: -1 };

    const skip = (parseInt(page) - 1) * parseInt(limit);
    const total = await Product.countDocuments(query);
    
    const products = await Product.find(query)
      .sort(sortOption)
      .skip(skip)
      .limit(parseInt(limit));

    res.json({
      products,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit))
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Získať jeden produkt
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produkt nebol nájdený' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Vytvoriť produkt (admin)
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Aktualizovať produkt (admin)
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) {
      return res.status(404).json({ message: 'Produkt nebol nájdený' });
    }
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Zmazať produkt (admin)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Produkt nebol nájdený' });
    }
    res.json({ message: 'Produkt bol zmazaný' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

