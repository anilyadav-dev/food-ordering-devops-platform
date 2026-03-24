import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import api from '../utils/api';

function OrderHistoryPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userInfo?._id) return;

      try {
        const res = await api.get(`/api/orders/${userInfo._id}`);
        setOrders(res.data);
      } catch (err) {
        setError('Failed to load order history');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [userInfo]);

  return (
    <div className="page-card">
      <div className="page-header">
        <div>
          <p className="eyebrow">Order History</p>
          <h2 className="section-title">Your Previous Orders</h2>
          <p className="auth-text">See all orders placed from your account.</p>
        </div>
        <div className="menu-badge">{orders.length} Orders</div>
      </div>

      {loading ? (
        <p className="auth-text">Loading order history...</p>
      ) : error ? (
        <p className="error-text">{error}</p>
      ) : orders.length === 0 ? (
        <p className="auth-text">No orders found yet.</p>
      ) : (
        <div className="order-history-list">
          {orders.map((order) => (
            <div key={order._id} className="order-history-card">
              <div className="order-topline">
                <span className="tiny-pill">Status: {order.status}</span>
                <span className="tiny-pill">
                  Total: ${Number(order.totalPrice).toFixed(2)}
                </span>
              </div>

              <p className="tiny-text">
                <strong>Order ID:</strong> {order._id}
              </p>

              <div className="history-items">
                {order.items.map((item, index) => (
                  <div key={index} className="history-item">
                    <span>{item.menuItem?.name || 'Menu Item'}</span>
                    <span>Qty: {item.quantity}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistoryPage;
