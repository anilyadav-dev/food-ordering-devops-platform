import apiClient from './apiClient';

export const placeOrder = async ({ userId, cartItems }) => {
  for (const item of cartItems) {
    await apiClient.post('/cart', {
      user: userId,
      menuItem: item._id,
      quantity: item.quantity,
    });
  }

  const { data } = await apiClient.post('/orders', {
    user: userId,
  });

  return data;
};

export const fetchOrderHistory = async (userId) => {
  const { data } = await apiClient.get(`/orders/${userId}`);
  return data;
};
