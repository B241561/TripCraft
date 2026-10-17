import axios from 'axios';

const configuredApiUrl = import.meta.env.VITE_API_URL;

export const normalizeApiBaseUrl = (apiUrl) => {
  if (!apiUrl) return '/api';
  if (apiUrl.startsWith('/')) return apiUrl.replace(/\/+$/, '');

  const parsedUrl = new URL(apiUrl.startsWith('http') ? apiUrl : `https://${apiUrl}`);
  const hostname = parsedUrl.hostname;
  if (hostname !== 'localhost' && !hostname.includes('.') && !hostname.includes(':')) {
    parsedUrl.hostname = `${hostname}.onrender.com`;
  }

  const basePath = parsedUrl.pathname.replace(/\/+$/, '').replace(/\/api$/, '');
  return `${parsedUrl.origin}${basePath}/api`;
};

const apiBaseUrl = normalizeApiBaseUrl(configuredApiUrl);

const API = axios.create({ baseURL: apiBaseUrl });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('tripcraft_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth
export const registerUser = (data) => API.post('/auth/register', data);
export const loginUser = (data) => API.post('/auth/login', data);
export const getMe = () => API.get('/auth/me');

// Trips
export const generateTrip = (data) => API.post('/trip/generate', data);
export const getMyTrips = () => API.get('/trip/my-trips');
export const getTripById = (id) => API.get(`/trip/${id}`);
export const deleteTrip = (id) => API.delete(`/trip/${id}`);
