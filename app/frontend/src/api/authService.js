import apiClient from './apiClient';

export const loginUser = async (payload) => {
  const { data } = await apiClient.post('/api/users/login', payload);
  return data;
};

export const registerUser = async (payload) => {
  const { data } = await apiClient.post('/api/users', payload);
  return data;
};

export const loginAdmin = async (payload) => {
  const { data } = await apiClient.post('/api/users/admin-login', payload);
  return data;
};
