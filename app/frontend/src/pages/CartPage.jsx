import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from '../features/cart/cartSlice';
import api from '../utils/api';

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!userInfo?._id) {
      setError('Please login first');
      setMessage('');
      return;
    }

    if (cartItems.length === 0) {
      setError('Your cart is empty. Add items before ordering.');
      setMessage('');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      setError('');

      for (const item of cartItems) {
        await api.post('/api/cart', {
          user: userInfo._id,
          menuItem: item._id,
          quantity: item.quantity,
        });
      }

      await api.post('/api/orders', {
        user: userInfo._id,
      });

      dispatch(clearCart());
      setMessage('Order placed successfully!');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Your Cart</p>
          <h2 className="section-title">Cart Items</h2>
          <p className="auth-text">
            Increase, decrease, remove items, and place your order from here.
          </p>
        </div>
        <div className="menu-badge">{totalCount} Items</div>
      </div>

      {message && <p className="success-text">{message}</p>}
      {error && <p className="error-text">{error}</p>}

      {cartItems.length === 0 ? (
        <p className="auth-text">
          {message
            ? 'Your order has been placed and the cart is now empty.'
            : 'Your cart is empty right now.'}
        </p>
      ) : (
        <div className="cart-list">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-card">
              <div className="cart-main">
                <h3 className="menu-title">{item.name}</h3>
                <p className="menu-description">{item.description}</p>
                <p className="tiny-text">
                  <strong>Category:</strong> {item.category || 'Food'}
                </p>
                <p className="menu-price">${item.price}</p>
              </div>

              <div className="cart-actions">
                <div className="qty-box">
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(decreaseQty(item._id))}
                  >
                    -
                  </button>
                  <span className="qty-number">{item.quantity}</span>
                  <button
                    className="qty-btn"
                    onClick={() => dispatch(increaseQty(item._id))}
                  >
                    +
                  </button>
                </div>

                <button
                  className="btn btn-secondary"
                  onClick={() => dispatch(removeFromCart(item._id))}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
            <div className="hero-actions">
              <button
                className="btn btn-dark"
                onClick={handlePlaceOrder}
                disabled={loading}
              >
                {loading ? 'Placing Order...' : 'Place Order'}
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => dispatch(clearCart())}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
