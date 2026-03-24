import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import api from '../utils/api';

function MenuPage() {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await api.get('/api/menu');
        setMenuItems(res.data);
      } catch (err) {
        setError('Failed to load menu');
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (loading) {
    return (
      <div className="page-card">
        <p className="eyebrow">Food Menu</p>
        <h2 className="section-title">Available Menu Items</h2>
        <p className="auth-text">Loading menu...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-card">
        <p className="eyebrow">Food Menu</p>
        <h2 className="section-title">Available Menu Items</h2>
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Food Menu</p>
          <h2 className="section-title">Available Menu Items</h2>
          <p className="auth-text">
            Explore delicious items and add them to your cart.
          </p>
        </div>
        <div className="menu-badge">{menuItems.length} Items</div>
      </div>

      <div className="menu-grid">
        {menuItems.map((item) => (
          <div key={item._id} className="menu-card">
            <div className="menu-card-top">
              <div className="menu-icon">🍽️</div>
              <span className="menu-category">{item.category || 'Food'}</span>
            </div>

            <h3 className="menu-title">{item.name}</h3>
            <p className="menu-description">
              {item.description || 'Fresh and tasty menu item.'}
            </p>

            {item.image && (
              <p className="tiny-text">
                <strong>Image:</strong> {item.image}
              </p>
            )}

            <div className="menu-footer">
              <p className="menu-price">${item.price}</p>
              <button
                className="btn btn-primary"
                onClick={() => handleAddToCart(item)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MenuPage;
