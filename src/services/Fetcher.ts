import axios from 'axios';

const token = () => {
  return localStorage.getItem('token');
};

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
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
