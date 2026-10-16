import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL || '/api' });

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
