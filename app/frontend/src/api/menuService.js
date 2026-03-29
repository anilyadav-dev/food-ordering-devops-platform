import apiClient from './apiClient';

export const fetchMenuItems = async () => {
  const { data } = await apiClient.get('/menu');
  return data;
};

export const createMenuItem = async (payload) => {
  const { data } = await apiClient.post('/menu', payload);
  return data;
};

export const updateMenuItem = async (id, payload) => {
  const { data } = await apiClient.put(`/menu/${id}`, payload);
  return data;
};

export const deleteMenuItem = async (id) => {
  const { data } = await apiClient.delete(`/menu/${id}`);
  return data;
};
