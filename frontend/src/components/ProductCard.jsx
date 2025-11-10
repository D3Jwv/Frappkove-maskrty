import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { wishlistAPI } from '../services/api';
import { toast } from 'react-toastify';
import { useState } from 'react';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    addToCart(product, 1);
  };

  const handleWishlist = async (e) => {
    e.preventDefault();
    if (!user) {
      toast.error('Musíte byť prihlásení');
      return;
    }
    setWishlistLoading(true);
    try {
      await wishlistAPI.add({ productId: product._id });
      toast.success('Pridané do wishlistu');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Chyba');
    } finally {
      setWishlistLoading(false);
    }
  };

  return (
    <div className="product-card">
      <Link to={`/products/${product._id}`} className="product-link">
        <div className="product-image">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="no-image">Žiadny obrázok</div>
          )}
        </div>
        <div className="product-info">
          <h3>{product.name}</h3>
          <p className="product-description">{product.description}</p>
          <div className="product-footer">
            <span className="product-price">{product.price.toFixed(2)} €</span>
            <span className="product-stock">
              {product.stock > 0 ? `Na sklade: ${product.stock}` : 'Nie je na sklade'}
            </span>
          </div>
        </div>
      </Link>
      <div className="product-actions">
        <button
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="btn-add-to-cart"
        >
          {product.stock > 0 ? 'Pridať do košíka' : 'Nie je na sklade'}
        </button>
        {user && (
          <button
            onClick={handleWishlist}
            disabled={wishlistLoading}
            className="btn-wishlist"
            title="Pridať do wishlistu"
          >
            ♥
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

