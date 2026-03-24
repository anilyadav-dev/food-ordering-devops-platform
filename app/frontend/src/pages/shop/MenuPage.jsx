import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import { addToCart } from '../../features/cart/cartSlice';
import { fetchMenu } from '../../features/menu/menuSlice';

function MenuPage() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.menu);

  useEffect(() => {
    dispatch(fetchMenu());
  }, [dispatch]);

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  if (loading) {
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

  if (error) {
    return (
      <div className="page-card">
        <PageHeader eyebrow="Food Menu" title="Available Menu Items" />
        <p className="error-text">{error}</p>
      </div>
    );
  }

  return (
    <div className="page-card">
      <PageHeader
        eyebrow="Food Menu"
        title="Available Menu Items"
        description="Explore delicious items and add them to your cart."
        badge={`${items.length} Items`}
      />

      <div className="menu-grid">
        {items.map((item) => (
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
