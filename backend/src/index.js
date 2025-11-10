const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
require('dotenv').config();

const app = express();

// CORS konfigurácia - MUSÍ BYŤ PRED HELMET!
// Normalizácia origin - odstránenie trailing slash
const normalizeOrigin = (origin) => {
  if (!origin) return origin;
  return origin.replace(/\/$/, ''); // Odstráni trailing slash
};

const frontendUrl = normalizeOrigin(process.env.FRONTEND_URL || process.env.CORS_ORIGIN || 'http://localhost:3000');

const corsOptions = {
  origin: (origin, callback) => {
    // Normalizácia prichádzajúceho origin
    const normalizedOrigin = normalizeOrigin(origin);
    const normalizedAllowed = normalizeOrigin(frontendUrl);
    
    // Povoliť ak sa zhoduje (s alebo bez trailing slash)
    if (!normalizedOrigin || normalizedOrigin === normalizedAllowed) {
      callback(null, true);
    } else {
      console.warn('⚠️ CORS: Origin nezhoduje sa:', {
        incoming: normalizedOrigin,
        allowed: normalizedAllowed
      });
      callback(null, true); // Pre produkciu povolíme, ale logujeme
    }
  },
  credentials: true,
  optionsSuccessStatus: 200
};

// Debug logging pre CORS
console.log('🌐 CORS nastavený pre origin:', frontendUrl);
console.log('🌐 NODE_ENV:', process.env.NODE_ENV || 'development');

app.use(cors(corsOptions));

// Security middleware - PO CORS!
if (process.env.NODE_ENV === 'production') {
  app.use(helmet({
    crossOriginResourcePolicy: { policy: "cross-origin" },
    crossOriginEmbedderPolicy: false
  }));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minút
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // 100 pre produkciu, 1000 pre vývoj
  message: 'Príliš veľa požiadaviek z tejto IP adresy, skúste to znova neskôr.'
});
app.use('/api/', limiter);

// Middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/eshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB pripojené'))
.catch(err => console.error('Chyba pripojenia MongoDB:', err));

// Routes
const productRoutes = require('./routes/productRoutes');
const userRoutes = require('./routes/userRoutes');
const orderRoutes = require('./routes/orderRoutes');
const statsRoutes = require('./routes/statsRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const reviewRoutes = require('./routes/reviewRoutes');
const wishlistRoutes = require('./routes/wishlistRoutes');
const adminUserRoutes = require('./routes/adminUserRoutes');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/stats', statsRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin/users', adminUserRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Backend beží' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server beží na porte ${PORT}`);
});

