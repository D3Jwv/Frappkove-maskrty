import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usersAPI } from '../services/api';
import { toast } from 'react-toastify';
import './Auth.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await usersAPI.forgotPassword({ email });
      toast.success('Ak email existuje, bol odoslaný reset link');
      setSent(true);
    } catch (error) {
      toast.error('Chyba pri odosielaní emailu');
    } finally {
      setLoading(false);
    }
  };

  if (sent) {
    return (
      <div className="auth-page">
        <div className="auth-container">
          <h2>Email odoslaný</h2>
          <p>Skontrolujte svoju emailovú schránku pre inštrukcie na reset hesla.</p>
          <Link to="/login" className="btn-primary">Späť na prihlásenie</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Zabudli ste heslo?</h2>
        <p>Zadajte svoj email a pošleme vám link na reset hesla.</p>
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
          <button type="submit" disabled={loading} className="btn-submit">
            {loading ? 'Odosielam...' : 'Odoslať reset link'}
          </button>
        </form>
        <p className="auth-link">
          <Link to="/login">Späť na prihlásenie</Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

