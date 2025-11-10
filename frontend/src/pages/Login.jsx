import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Chyba pri prihlásení');
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Prihlásiť sa</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Heslo:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-submit">
            Prihlásiť sa
          </button>
        </form>
        <p className="auth-link">
          Nemáte účet? <Link to="/register">Registrovať sa</Link>
        </p>
        <p className="auth-link">
          <Link to="/forgot-password">Zabudli ste heslo?</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

