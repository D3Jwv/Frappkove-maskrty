import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ordersAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminOrders.css';

const AdminOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadOrders();
  }, [user]);

  const loadOrders = async () => {
    try {
      const response = await ordersAPI.getAll();
      setOrders(response.data);
    } catch (error) {
      console.error('Chyba pri načítaní objednávok:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (orderId, newStatus) => {
    try {
      await ordersAPI.updateStatus(orderId, { status: newStatus });
      loadOrders(); // Obnoviť zoznam
      toast.success('Status objednávky bol aktualizovaný');
    } catch (error) {
      console.error('Chyba pri aktualizácii statusu:', error);
      toast.error('Chyba pri aktualizácii statusu');
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
    <div className="admin-orders-page">
      <h1>Správa objednávok (Admin)</h1>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>Zatiaľ nie sú žiadne objednávky</p>
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
                  <p className="order-user">
                    Užívateľ: {order.user?.name || order.user?.email || 'Neznámy'}
                  </p>
                </div>
                <div className="order-status-section">
                  <div className="order-status" style={{ color: getStatusColor(order.status) }}>
                    {getStatusText(order.status)}
                  </div>
                  <select
                    value={order.status}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="pending">Čaká na spracovanie</option>
                    <option value="processing">Spracováva sa</option>
                    <option value="shipped">Odoslané</option>
                    <option value="delivered">Doručené</option>
                    <option value="cancelled">Zrušené</option>
                  </select>
                </div>
              </div>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <span>{item.product?.name || 'Produkt'}</span>
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

export default AdminOrders;

