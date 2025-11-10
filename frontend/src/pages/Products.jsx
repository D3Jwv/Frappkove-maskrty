import { useEffect, useState } from 'react';
import { productsAPI } from '../services/api';
import ProductCard from '../components/ProductCard';
import { toast } from 'react-toastify';
import './Products.css';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [search, category, minPrice, maxPrice, sortBy, page]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const params = { page, limit: 12 };
      if (search) params.search = search;
      if (category) params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;
      if (sortBy) params.sortBy = sortBy;
      
      const response = await productsAPI.getAll(params);
      setProducts(response.data.products || response.data);
      if (response.data.totalPages) {
        setTotalPages(response.data.pages);
      }
    } catch (error) {
      toast.error('Chyba pri načítaní produktov');
      console.error('Chyba pri načítaní produktov:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClearFilters = () => {
    setSearch('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    setSortBy('');
    setPage(1);
  };

  return (
    <div className="products-page">
      <div className="products-header">
        <h1>Produkty</h1>
        <div className="filters">
          <input
            type="text"
            placeholder="Hľadať produkty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="filter-select"
          >
            <option value="">Všetky kategórie</option>
            <option value="elektronika">Elektronika</option>
            <option value="oblecenie">Oblečenie</option>
            <option value="knihy">Knihy</option>
            <option value="sport">Šport</option>
            <option value="domacnost">Domácnosť</option>
          </select>
          <input
            type="number"
            placeholder="Min cena"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="price-input"
            min="0"
            step="0.01"
          />
          <input
            type="number"
            placeholder="Max cena"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="price-input"
            min="0"
            step="0.01"
          />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="filter-select"
          >
            <option value="">Triediť podľa</option>
            <option value="price-asc">Cena: od najlacnejšieho</option>
            <option value="price-desc">Cena: od najdrahšieho</option>
            <option value="name-asc">Názov: A-Z</option>
            <option value="name-desc">Názov: Z-A</option>
          </select>
          {(search || category || minPrice || maxPrice || sortBy) && (
            <button onClick={handleClearFilters} className="btn-clear-filters">
              Vymazať filtre
            </button>
          )}
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Načítavam produkty...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="no-products">
          <p>Žiadne produkty neboli nájdené</p>
          {(search || category || minPrice || maxPrice) && (
            <button onClick={handleClearFilters} className="btn-clear-filters">
              Vymazať filtre
            </button>
          )}
        </div>
      ) : (
        <>
          <div className="products-grid">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="pagination-btn"
              >
                Predchádzajúca
              </button>
              <span className="pagination-info">
                Strana {page} z {totalPages}
              </span>
              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="pagination-btn"
              >
                Ďalšia
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Products;

