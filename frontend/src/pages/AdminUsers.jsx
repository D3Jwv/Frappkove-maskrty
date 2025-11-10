import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { adminUsersAPI } from '../services/api';
import { toast } from 'react-toastify';
import './AdminUsers.css';

const AdminUsers = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
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
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadUsers = async () => {
    try {
      setLoading(true);
      const response = await adminUsersAPI.getAll();
      setUsers(response.data || []);
    } catch (error) {
      toast.error('Chyba pri načítaní užívateľov');
      console.error('Chyba:', error);
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId, newRole) => {
    try {
      await adminUsersAPI.update(userId, { role: newRole });
      toast.success('Role bola zmenená');
      loadUsers();
    } catch (error) {
      toast.error('Chyba pri zmene role');
    }
  };

  const handleDelete = async (userId) => {
    if (!window.confirm('Naozaj chcete zmazať tohto užívateľa?')) {
      return;
    }

    try {
      await adminUsersAPI.delete(userId);
      toast.success('Užívateľ bol zmazaný');
      loadUsers();
    } catch (error) {
      toast.error('Chyba pri mazaní užívateľa');
    }
  };

  if (loading) {
    return <div className="loading">Načítavam...</div>;
  }

  return (
    <div className="admin-users-page">
      <h1>Správa užívateľov</h1>
      <div className="users-table-container">
        <table className="users-table">
          <thead>
            <tr>
              <th>Meno</th>
              <th>Email</th>
              <th>Role</th>
              <th>Registrácia</th>
              <th>Akcie</th>
            </tr>
          </thead>
          <tbody>
            {users.length === 0 ? (
              <tr>
                <td colSpan="5" className="no-users">Žiadni užívatelia</td>
              </tr>
            ) : (
              users.map((u) => (
                <tr key={u._id}>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>
                    <select
                      value={u.role}
                      onChange={(e) => handleRoleChange(u._id, e.target.value)}
                      className="role-select"
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td>{new Date(u.createdAt).toLocaleDateString('sk-SK')}</td>
                  <td>
                    <button
                      onClick={() => handleDelete(u._id)}
                      className="btn-delete"
                      disabled={u._id === user._id}
                    >
                      Zmazať
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminUsers;

