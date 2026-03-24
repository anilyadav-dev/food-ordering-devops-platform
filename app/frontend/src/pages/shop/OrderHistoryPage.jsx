import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { fetchOrderHistory } from '../../api/orderService';
import PageHeader from '../../components/PageHeader';

function OrderHistoryPage() {
  const { userInfo } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [status, setStatus] = useState({ loading: true, error: '' });

  useEffect(() => {
    const loadOrders = async () => {
      if (!userInfo?._id) {
        setStatus({ loading: false, error: '' });
        return;
      }

      try {
        const history = await fetchOrderHistory(userInfo._id);
        setOrders(history);
        setStatus({ loading: false, error: '' });
      } catch (err) {
        setStatus({ loading: false, error: 'Failed to load order history' });
      }
    };

    loadOrders();
  }, [userInfo]);

  return (
    <div className="page-card">
      <PageHeader
        eyebrow="Order History"
        title="Your Previous Orders"
        description="See all orders placed from your account."
        badge={`${orders.length} Orders`}
      />

      {status.loading ? (
        <p className="auth-text">Loading order history...</p>
      ) : status.error ? (
        <p className="error-text">{status.error}</p>
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
