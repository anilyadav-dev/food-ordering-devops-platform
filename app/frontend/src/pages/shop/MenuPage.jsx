import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchMenuItems } from '../../api/menuService';
import PageHeader from '../../components/PageHeader';
import { addToCart } from '../../features/cart/cartSlice';

function MenuPage() {
  const dispatch = useDispatch();
  const [menuItems, setMenuItems] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    const loadMenu = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
      } catch (err) {
        setStatus({ loading: false, error: 'Failed to load menu' });
        return;
      }

      setStatus({ loading: false, error: '' });
    };

    loadMenu();
  }, []);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (status.loading) {
    return (
      <div className="page-card">
        <PageHeader
          eyebrow="Food Menu"
          title="Available Menu Items"
          description="Loading menu..."
        />
      </div>
    );
  }

  if (status.error) {
    return (
      <div className="page-card">
        <PageHeader eyebrow="Food Menu" title="Available Menu Items" />
        <p className="error-text">{status.error}</p>
      </div>
    );
  }

  return (
    <div className="page-card">
      <PageHeader
        eyebrow="Food Menu"
        title="Available Menu Items"
        description="Explore delicious items and add them to your cart."
        badge={`${menuItems.length} Items`}
      />

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
