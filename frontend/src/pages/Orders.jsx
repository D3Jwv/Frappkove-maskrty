import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './Orders.css';

const Orders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const response = await ordersAPI.getMyOrders();
      setOrders(response.data);
    } catch (error) {
      console.error('Chyba pri načítaní objednávok:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: '#f39c12',
      processing: '#3498db',
      shipped: '#9b59b6',
      delivered: '#27ae60',
      cancelled: '#e74c3c'
    };
    return colors[status] || '#666';
  };

  const getStatusText = (status) => {
    const texts = {
      pending: 'Čaká na spracovanie',
      processing: 'Spracováva sa',
      shipped: 'Odoslané',
      delivered: 'Doručené',
      cancelled: 'Zrušené'
    };
    return texts[status] || status;
  };

  if (loading) {
    return <div className="loading">Načítavam...</div>;
  }

  return (
    <div className="orders-page">
      <h1>Moje objednávky</h1>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Zatiaľ ste nemali žiadne objednávky</p>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div key={order._id} className="order-card">
              <div className="order-header">
                <div>
                  <h3>Objednávka #{order._id.slice(-8)}</h3>
                  <p className="order-date">
                    {new Date(order.createdAt).toLocaleDateString('sk-SK')}
                  </p>
                </div>
                <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                  {getStatusText(order.status)}
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.product.name}</span>
                    <span>{item.quantity} × {item.price.toFixed(2)} €</span>
                  </div>
                ))}
              </div>
              <div className="order-footer">
                <div className="order-total">
                  Celkom: <strong>{order.totalAmount.toFixed(2)} €</strong>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;

