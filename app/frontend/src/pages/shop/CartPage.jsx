import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FeedbackMessage from '../../components/FeedbackMessage';
import PageHeader from '../../components/PageHeader';
import {
  clearCart,
  decreaseQty,
  increaseQty,
  removeFromCart,
} from '../../features/cart/cartSlice';
import { placeOrder } from '../../api/orderService';

function CartPage() {
  const dispatch = useDispatch();
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);
  const [status, setStatus] = useState({
    loading: false,
    message: '',
    error: '',
  });

  const totalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (total, item) => total + Number(item.price) * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!userInfo?._id) {
      setStatus({
        loading: false,
        message: '',
        error: 'Please login first',
      });
      return;
    }

    if (cartItems.length === 0) {
      setStatus({
        loading: false,
        message: '',
        error: 'Your cart is empty. Add items before ordering.',
      });
      return;
    }

    setStatus({ loading: true, message: '', error: '' });

    try {
      await placeOrder({
        userId: userInfo._id,
        cartItems,
      });

      dispatch(clearCart());
      setStatus({
        loading: false,
        message: 'Order placed successfully!',
        error: '',
      });
    } catch (err) {
      setStatus({
        loading: false,
        message: '',
        error: err.response?.data?.message || 'Failed to place order',
      });
    }
  };

  return (
    <div className="page-card">
      <PageHeader
        eyebrow="Your Cart"
        title="Cart Items"
        description="Increase, decrease, remove items, and place your order from here."
        badge={`${totalCount} Items`}
      />

      <FeedbackMessage message={status.message} />
      <FeedbackMessage message={status.error} type="error" />

      {cartItems.length === 0 ? (
        <p className="auth-text">
          {status.message
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
                disabled={status.loading}
              >
                {status.loading ? 'Placing Order...' : 'Place Order'}
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
