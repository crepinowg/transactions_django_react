import axios from 'axios';

// Crée une instance axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000', // ton backend FastAPI
  headers: {
    'Content-Type': 'application/json',
  },
});

// Ajouter un intercept pour inclure le token si présent
api.interceptors.request.use((config) => {
  // Récupère le token depuis le localStorage (ou cookie si tu préfères)
  const token = '123456789';
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default api;