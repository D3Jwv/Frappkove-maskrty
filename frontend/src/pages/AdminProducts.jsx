import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { productsAPI } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './AdminProducts.css';

const AdminProducts = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
    category: '',
    stock: '',
    active: true
  });

  useEffect(() => {
    // Počkať, kým sa načíta user
    if (authLoading) {
      return;
    }
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.role !== 'admin') {
      navigate('/');
      return;
    }
    loadProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, authLoading]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      const response = await productsAPI.getAll({});
      // Backend vracia { products: [...], total, pages }
      // API wrapper normalizuje to na { data: { products, total, pages } }
      const data = response.data;
      const productsList = data?.products || (Array.isArray(data) ? data : []);
      setProducts(productsList);
    } catch (error) {
      toast.error('Chyba pri načítaní produktov');
      console.error('Chyba pri načítaní produktov:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price),
        stock: parseInt(formData.stock)
      };

      if (editingProduct) {
        await productsAPI.update(editingProduct._id, productData);
        toast.success('Produkt bol aktualizovaný');
      } else {
        await productsAPI.create(productData);
        toast.success('Produkt bol vytvorený');
      }

      resetForm();
      loadProducts();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Chyba pri uložení produktu');
      console.error('Chyba:', error);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      image: product.image || '',
      category: product.category,
      stock: product.stock.toString(),
      active: product.active
    });
    setShowForm(true);
  };

  const handleDelete = async (productId) => {
    if (!window.confirm('Naozaj chcete zmazať tento produkt?')) {
      return;
    }

    try {
      await productsAPI.delete(productId);
      toast.success('Produkt bol zmazaný');
      loadProducts();
    } catch (error) {
      toast.error('Chyba pri mazaní produktu');
      console.error('Chyba:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      image: '',
      category: '',
      stock: '',
      active: true
    });
    setEditingProduct(null);
    setShowForm(false);
  };

  if (authLoading || loading) {
    return <div className="loading">Načítavam...</div>;
  }

  return (
    <div className="admin-products-page">
      <div className="admin-header">
        <h1>Správa produktov</h1>
        <button onClick={() => setShowForm(!showForm)} className="btn-primary">
          {showForm ? 'Zrušiť' : '+ Pridať produkt'}
        </button>
      </div>

      {showForm && (
        <div className="product-form-container">
          <h2>{editingProduct ? 'Editovať produkt' : 'Nový produkt'}</h2>
          <form onSubmit={handleSubmit} className="product-form">
            <div className="form-group">
              <label>Názov produktu *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Popis *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows="4"
                required
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Cena (€) *</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label>Sklad *</label>
                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  min="0"
                  required
                />
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Kategória *</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Vyberte kategóriu</option>
                  <option value="elektronika">Elektronika</option>
                  <option value="oblecenie">Oblečenie</option>
                  <option value="knihy">Knihy</option>
                  <option value="sport">Šport</option>
                  <option value="domacnost">Domácnosť</option>
                </select>
              </div>

              <div className="form-group">
                <label>URL obrázka</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="form-group checkbox-group">
              <label>
                <input
                  type="checkbox"
                  name="active"
                  checked={formData.active}
                  onChange={handleInputChange}
                />
                Aktívny produkt
              </label>
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit">
                {editingProduct ? 'Uložiť zmeny' : 'Vytvoriť produkt'}
              </button>
              <button type="button" onClick={resetForm} className="btn-cancel">
                Zrušiť
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Názov</th>
              <th>Kategória</th>
              <th>Cena</th>
              <th>Sklad</th>
              <th>Status</th>
              <th>Akcie</th>
            </tr>
          </thead>
          <tbody>
            {products.length === 0 ? (
              <tr>
                <td colSpan="6" className="no-products">
                  Žiadne produkty
                </td>
              </tr>
            ) : (
              products.map((product) => (
                <tr key={product._id || product.id}>
                  <td>{product.name || 'Bez názvu'}</td>
                  <td>{product.category || '-'}</td>
                  <td>{product.price ? product.price.toFixed(2) : '0.00'} €</td>
                  <td>{product.stock ?? 0}</td>
                  <td>
                    <span className={`status-badge ${product.active ? 'active' : 'inactive'}`}>
                      {product.active ? 'Aktívny' : 'Neaktívny'}
                    </span>
                  </td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => handleEdit(product)}
                        className="btn-edit"
                      >
                        Editovať
                      </button>
                      <button
                        onClick={() => handleDelete(product._id || product.id)}
                        className="btn-delete"
                      >
                        Zmazať
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminProducts;

