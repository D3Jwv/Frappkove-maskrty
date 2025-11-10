import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Debug logging
console.log('🌐 API URL:', API_URL);
console.log('🌐 VITE_API_URL env:', import.meta.env.VITE_API_URL);

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Error interceptor pre lepšie error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', {
      url: error.config?.url,
      method: error.config?.method,
      status: error.response?.status,
      data: error.response?.data,
      message: error.message
    });
    return Promise.reject(error);
  }
);

// Interceptor pre pridanie tokenu
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products API
export const productsAPI = {
  getAll: (params) => {
    return api.get('/products', { params }).then(res => {
      // Backend vracia buď { products: [...], total, pages } alebo priamo pole
      // Normalizujeme to na jednotný formát
      if (Array.isArray(res.data)) {
        return { data: { products: res.data, total: res.data.length, pages: 1 } };
      }
      // Ak už má formát { products, total, pages }, vráť to tak
      if (res.data && res.data.products) {
        return res;
      }
      // Fallback - vráť pôvodnú odpoveď
      return res;
    });
  },
  getById: (id) => api.get(`/products/${id}`),
  create: (data) => api.post('/products', data),
  update: (id, data) => api.put(`/products/${id}`, data),
  delete: (id) => api.delete(`/products/${id}`),
};

// Orders API
export const ordersAPI = {
  create: (data) => api.post('/orders', data),
  getMyOrders: () => api.get('/orders/my-orders'),
  getById: (id) => api.get(`/orders/${id}`),
  getAll: () => api.get('/orders'),
  updateStatus: (id, data) => api.put(`/orders/${id}/status`, data),
};

// Stats API
export const statsAPI = {
  getStats: () => api.get('/stats'),
};

// Payments API
export const paymentsAPI = {
  createIntent: (data) => api.post('/payments/create-intent', data),
  confirm: (data) => api.post('/payments/confirm', data),
};

// Reviews API
export const reviewsAPI = {
  getProductReviews: (productId) => api.get(`/reviews/product/${productId}`),
  create: (data) => api.post('/reviews', data),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
};

// Wishlist API
export const wishlistAPI = {
  get: () => api.get('/wishlist'),
  add: (data) => api.post('/wishlist', data),
  remove: (productId) => api.delete(`/wishlist/${productId}`),
};

// Admin Users API
export const adminUsersAPI = {
  getAll: () => api.get('/admin/users'),
  getById: (id) => api.get(`/admin/users/${id}`),
  update: (id, data) => api.put(`/admin/users/${id}`, data),
  delete: (id) => api.delete(`/admin/users/${id}`),
};

// Users API
export const usersAPI = {
  register: (data) => api.post('/users/register', data),
  login: (data) => api.post('/users/login', data),
  getProfile: () => api.get('/users/profile'),
  updateProfile: (data) => api.put('/users/profile', data),
  forgotPassword: (data) => api.post('/users/forgot-password', data),
  resetPassword: (data) => api.post('/users/reset-password', data),
};

export default api;

