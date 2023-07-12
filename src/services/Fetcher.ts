import axios from 'axios';

const token = () => {
  return localStorage.getItem('token');
};

export const instance = axios.create({
  baseURL: 'http://localhost:5000/api',
  /*localhost/125.188.246.81*/
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
