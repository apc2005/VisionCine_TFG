import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Configurar interceptors
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response?.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login';
  }
  return Promise.reject(error);
});

// Autenticación
// Autenticación
export const register = async (userData) => {
  try {
    const { data } = await api.post('/register', userData);
    return data;
  } catch (error) {
    console.error('Error al registrar:', error);
    throw error;
  }
};

export const getProfileData = async () => {
  try {
    const { data } = await api.get('/profile');
    return data;
  } catch (error) {
    console.error('Error al obtener datos del perfil:', error);
    throw error;
  }
};

export const login = async (credentials) => {
  try {
    const { data } = await api.post('/login', credentials);
    return data;
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw error;
  }
};

// Películas
export const fetchMovies = async () => {
  try {
    const { data } = await api.get('/movies');
    return data;
  } catch (error) {
    console.error('Error al obtener películas:', error);
    return [];
  }
};

export const searchMovies = async (query) => {
  try {
    const { data } = await api.get(`/movies/search/${query}`);
    return data;
  } catch (error) {
    console.error('Error al buscar películas:', error);
    return [];
  }
};

export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await api.get(`/movies/${id}`);
    return data;
  } catch (error) {
    console.error('Error al obtener detalles:', error);
    return null;
  }
};

// Reviews
export const createReview = async (reviewData) => {
  try {
    const { data } = await api.post('/reviews', reviewData);
    return data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};

// Hooks para React Query
export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: fetchMovies
  });
};

export const useMovieDetails = (id) => {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id
  });
};
