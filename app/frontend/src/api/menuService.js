import apiClient from './apiClient';

export const fetchMenuItems = async () => {
  const { data } = await apiClient.get('/api/menu');
  return data;
};

export const createMenuItem = async (payload) => {
  const { data } = await apiClient.post('/api/menu', payload);
  return data;
};

export const updateMenuItem = async (id, payload) => {
  const { data } = await apiClient.put(`/api/menu/${id}`, payload);
  return data;
};

export const deleteMenuItem = async (id) => {
  const { data } = await apiClient.delete(`/api/menu/${id}`);
  return data;
};
