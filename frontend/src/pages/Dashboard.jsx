import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { toast } from 'react-toastify';
import api from '../services/api';
import './Dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState(null);
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
    loadStats();
  }, [user]);

  const loadStats = async () => {
    try {
      const response = await api.get('/stats');
      setStats(response.data);
    } catch (error) {
      toast.error('Chyba pri načítaní štatistík');
      console.error('Chyba:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Načítavam štatistiky...</div>;
  }

  if (!stats) {
    return <div className="error">Nepodarilo sa načítať štatistiky</div>;
  }

  const statusColors = {
    pending: '#f39c12',
    processing: '#3498db',
    shipped: '#9b59b6',
    delivered: '#27ae60',
    cancelled: '#e74c3c'
  };

  return (
    <div className="dashboard-page">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Celkový príjem</h3>
          <p className="stat-value">{stats.totalRevenue.toFixed(2)} €</p>
        </div>
        <div className="stat-card">
          <h3>Celkové objednávky</h3>
          <p className="stat-value">{stats.totalOrders}</p>
        </div>
        <div className="stat-card">
          <h3>Užívatelia</h3>
          <p className="stat-value">{stats.totalUsers}</p>
        </div>
        <div className="stat-card">
          <h3>Produkty</h3>
          <p className="stat-value">{stats.totalProducts}</p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h2>Príjmy za posledných 30 dní</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={stats.revenueByDay}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#3498db" name="Príjem (€)" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-card">
          <h2>Objednávky podľa statusu</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={Object.entries(stats.ordersByStatus).map(([status, count]) => ({ status, count }))}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="status" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#27ae60" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="top-products-card">
        <h2>Najpredávanejšie produkty</h2>
        <table className="top-products-table">
          <thead>
            <tr>
              <th>Produkt</th>
              <th>Predané množstvo</th>
              <th>Príjem</th>
            </tr>
          </thead>
          <tbody>
            {stats.topProducts.length === 0 ? (
              <tr>
                <td colSpan="3">Žiadne údaje</td>
              </tr>
            ) : (
              stats.topProducts.map((item, index) => (
                <tr key={index}>
                  <td>{item.productName}</td>
                  <td>{item.totalQuantity}</td>
                  <td>{item.totalRevenue.toFixed(2)} €</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;

