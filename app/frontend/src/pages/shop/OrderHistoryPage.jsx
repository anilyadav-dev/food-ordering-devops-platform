import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PageHeader from '../../components/PageHeader';
import { fetchOrders } from '../../features/order/orderSlice';

function OrderHistoryPage() {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.order);

  useEffect(() => {
    if (userInfo?._id) {
      dispatch(fetchOrders(userInfo._id));
    }
  }, [dispatch, userInfo]);

  return (
    <div className="page-card">
      <PageHeader
        eyebrow="Order History"
        title="Your Previous Orders"
        description="See all orders placed from your account."
        badge={`${orders.length} Orders`}
      />

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
