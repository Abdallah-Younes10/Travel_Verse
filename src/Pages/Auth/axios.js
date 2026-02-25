import axios from 'axios';
import i18n from '../../Lang/Lang'; // لو كنت تستخدم i18n.js

const instance = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    Accept: 'application/json',
  },
});

// أضف Interceptor لتحديث اللغة في كل طلب
instance.interceptors.request.use((config) => {
  const lang = localStorage.getItem('lang') || i18n.language || 'en';
  config.headers['Accept-Language'] = lang;
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

export default instance;
