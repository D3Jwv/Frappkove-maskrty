import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import './Cart.css';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    // Presmerovať na checkout stránku, kde sa vytvorí objednávka a zobrazí Stripe formulár
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="cart-empty">
        <h2>Váš košík je prázdny</h2>
        <button onClick={() => navigate('/products')} className="btn-primary">
          Prezrieť produkty
        </button>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1>Košík</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <div className="cart-item-image">
                {item.product.image ? (
                  <img src={item.product.image} alt={item.product.name} />
                ) : (
                  <div className="no-image-small">Obrázok</div>
                )}
              </div>
              <div className="cart-item-info">
                <h3>{item.product.name}</h3>
                <p className="cart-item-price">{item.product.price.toFixed(2)} €</p>
              </div>
              <div className="cart-item-quantity">
                <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                  -
                </button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                  +
                </button>
              </div>
              <div className="cart-item-total">
                {(item.product.price * item.quantity).toFixed(2)} €
              </div>
              <button
                onClick={() => removeFromCart(item.productId)}
                className="btn-remove"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <h2>Sumár</h2>
          <div className="summary-row">
            <span>Celkom:</span>
            <span className="total-price">{getTotalPrice().toFixed(2)} €</span>
          </div>
          <button onClick={handleCheckout} className="btn-checkout">
            Pokračovať k platbe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;

