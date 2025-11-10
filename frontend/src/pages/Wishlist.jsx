import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { wishlistAPI } from '../services/api';
import { toast } from 'react-toastify';
import ProductCard from '../components/ProductCard';
import './Wishlist.css';

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }
    loadWishlist();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const loadWishlist = async () => {
    try {
      setLoading(true);
      const response = await wishlistAPI.get();
      setProducts(response.data || []);
    } catch (error) {
      toast.error('Chyba pri načítaní wishlistu');
      console.error('Chyba:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await wishlistAPI.remove(productId);
      toast.success('Produkt odstránený z wishlistu');
      loadWishlist();
    } catch (error) {
      toast.error('Chyba pri odstraňovaní');
    }
  };

  if (loading) {
    return <div className="loading">Načítavam...</div>;
  }

  return (
    <div className="wishlist-page">
      <h1>Môj Wishlist</h1>
      {products.length === 0 ? (
        <div className="wishlist-empty">
          <p>Váš wishlist je prázdny</p>
          <button onClick={() => navigate('/products')} className="btn-primary">
            Prezrieť produkty
          </button>
        </div>
      ) : (
        <div className="wishlist-grid">
          {products.map((product) => (
            <div key={product._id} className="wishlist-item">
              <ProductCard product={product} />
              <button
                onClick={() => handleRemove(product._id)}
                className="btn-remove-wishlist"
              >
                Odstrániť z wishlistu
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;

