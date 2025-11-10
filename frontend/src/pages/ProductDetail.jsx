import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { productsAPI } from '../services/api';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    loadProduct();
  }, [id]);

  const loadProduct = async () => {
    try {
      const response = await productsAPI.getById(id);
      setProduct(response.data);
    } catch (error) {
      console.error('Chyba pri načítaní produktu:', error);
      navigate('/products');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    toast.success('Produkt pridaný do košíka!');
  };

  if (loading) {
    return <div className="loading">Načítavam...</div>;
  }

  if (!product) {
    return <div className="error">Produkt nebol nájdený</div>;
  }

  return (
    <div className="product-detail">
      <div className="product-detail-container">
        <div className="product-image-section">
          {product.image ? (
            <img src={product.image} alt={product.name} />
          ) : (
            <div className="no-image">Žiadny obrázok</div>
          )}
        </div>
        <div className="product-info-section">
          <h1>{product.name}</h1>
          <p className="product-category">Kategória: {product.category}</p>
          <p className="product-description">{product.description}</p>
          <div className="product-price-large">
            {product.price.toFixed(2)} €
          </div>
          <div className="product-stock-info">
            {product.stock > 0 ? (
              <span className="in-stock">Na sklade: {product.stock} ks</span>
            ) : (
              <span className="out-of-stock">Nie je na sklade</span>
            )}
          </div>
          {product.stock > 0 && (
            <div className="add-to-cart-section">
              <div className="quantity-selector">
                <label>Množstvo:</label>
                <input
                  type="number"
                  min="1"
                  max={product.stock}
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                />
              </div>
              <button onClick={handleAddToCart} className="btn-add-to-cart-large">
                Pridať do košíka
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;

