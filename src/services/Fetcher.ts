import axios from 'axios';

const token = () => {
  return localStorage.getItem('token');
};

export const instance = axios.create({
  baseURL: 'http://125.188.246.81:5000/api',
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer ${token()}`;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
