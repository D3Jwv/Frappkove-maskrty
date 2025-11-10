const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

// Získať štatistiky pre admin dashboard
exports.getStats = async (req, res) => {
  try {
    // Celkový počet objednávok
    const totalOrders = await Order.countDocuments();
    
    // Celkový príjem
    const orders = await Order.find();
    const totalRevenue = orders.reduce((sum, order) => sum + order.totalAmount, 0);
    
    // Objednávky podľa statusu
    const ordersByStatus = await Order.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    // Najpredávanejšie produkty
    const topProducts = await Order.aggregate([
      { $unwind: '$items' },
      {
        $group: {
          _id: '$items.product',
          totalQuantity: { $sum: '$items.quantity' },
          totalRevenue: { $sum: { $multiply: ['$items.quantity', '$items.price'] } }
        }
      },
      { $sort: { totalQuantity: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'product'
        }
      },
      { $unwind: '$product' },
      {
        $project: {
          productName: '$product.name',
          totalQuantity: 1,
          totalRevenue: 1
        }
      }
    ]);
    
    // Objednávky za posledných 30 dní
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const recentOrders = await Order.find({
      createdAt: { $gte: thirtyDaysAgo }
    }).sort({ createdAt: -1 });
    
    const revenueByDay = await Order.aggregate([
      {
        $match: {
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: '%Y-%m-%d', date: '$createdAt' }
          },
          revenue: { $sum: '$totalAmount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);
    
    // Celkový počet užívateľov
    const totalUsers = await User.countDocuments();
    
    // Celkový počet produktov
    const totalProducts = await Product.countDocuments();
    
    res.json({
      totalOrders,
      totalRevenue,
      totalUsers,
      totalProducts,
      ordersByStatus: ordersByStatus.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      topProducts,
      recentOrders: recentOrders.slice(0, 10),
      revenueByDay
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

