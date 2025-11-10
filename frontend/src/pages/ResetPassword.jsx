import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { usersAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Auth.css';

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Neplatný reset link');
      navigate('/login');
    }
  }, [token, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Heslá sa nezhodujú');
      return;
    }

    if (password.length < 6) {
      toast.error('Heslo musí mať aspoň 6 znakov');
      return;
    }

    setLoading(true);

    try {
      await usersAPI.resetPassword({ token, password });
      toast.success('Heslo bolo úspešne zmenené');
      navigate('/login');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Chyba pri zmene hesla');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Reset hesla</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nové heslo:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <div className="form-group">
            <label>Potvrďte heslo:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Mením heslo...' : 'Zmeniť heslo'}
          </button>
        </form>
        <p className="auth-link">
          <Link to="/login">Späť na prihlásenie</Link>
        </p>
      </div>
    </div>
  );
};

export default ResetPassword;

