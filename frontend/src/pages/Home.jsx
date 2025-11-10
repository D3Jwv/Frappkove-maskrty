import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const response = await productsAPI.getAll({});
      // Backend vracia { products: [...], total, pages } alebo normalizované pole
      const productsList = response.data?.products || (Array.isArray(response.data) ? response.data : []);
      setProducts(productsList.slice(0, 6)); // Zobraziť len prvých 6 produktov
    } catch (error) {
      console.error('Chyba pri načítaní produktov:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Načítavam...</div>;
  }

  return (
    <div className="home">
      <section className="hero">
        <h1>Vitajte v našom E-shope</h1>
        <p>Objavte naše najlepšie produkty</p>
        <Link to="/products" className="btn-primary">
          Prezrieť všetky produkty
        </Link>
      </section>

      <section className="featured-products">
        <h2>Odporúčané produkty</h2>
        <div className="products-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;

