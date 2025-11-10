import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Auth.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (password.length < 6) {
      setError('Heslo musí mať aspoň 6 znakov');
      setLoading(false);
      return;
    }

    try {
      await register(name, email, password);
      navigate('/');
    } catch (err) {
      console.error('Register error:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Chyba pri registrácii';
      setError(errorMessage);
      console.error('Error details:', {
        response: err.response,
        message: err.message,
        stack: err.stack
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Registrovať sa</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Meno:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
              minLength={6}
            />
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Registrujem...' : 'Registrovať sa'}
          </button>
        </form>
        <p className="auth-link">
          Už máte účet? <Link to="/login">Prihlásiť sa</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

