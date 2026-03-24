import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8080',
});

apiClient.interceptors.request.use((config) => {
  const userInfo = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null;

  if (userInfo?.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }

  return config;
});

export default apiClient;
