import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <h1>E-shop</h1>
        </Link>
        
        <nav className="nav">
          <Link to="/products">Produkty</Link>
          {user ? (
            <>
              <Link to="/orders">Moje objednávky</Link>
              <Link to="/wishlist">Wishlist</Link>
              {user.role === 'admin' && (
                <>
                  <Link to="/admin/dashboard" className="admin-link">
                    Dashboard
                  </Link>
                  <Link to="/admin/products" className="admin-link">
                    Správa produktov
                  </Link>
                  <Link to="/admin/orders" className="admin-link">
                    Správa objednávok
                  </Link>
                  <Link to="/admin/users" className="admin-link">
                    Správa užívateľov
                  </Link>
                </>
              )}
              <Link to="/cart" className="cart-link">
                Košík ({getTotalItems()})
              </Link>
              <span className="user-name">{user.name}</span>
              <button onClick={handleLogout} className="btn-logout">
                Odhlásiť sa
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Prihlásiť sa</Link>
              <Link to="/register">Registrovať sa</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;

