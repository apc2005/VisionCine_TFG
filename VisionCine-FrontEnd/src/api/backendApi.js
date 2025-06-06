import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

export const BASE_URL = 'http://localhost:8000/api';

export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  withCredentials: true
});

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
  return Promise.reject(error);
});

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

export const fetchMovies = async (page = 1, perPage = 10) => {
  try {
    const { data } = await api.get('/movies', {
      params: {
        page,
        per_page: perPage
      }
    });
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

export const createReview = async (reviewData) => {
  try {
    const { data } = await api.post('/reviews', reviewData);
    return data;
  } catch (error) {
    console.error('Error al crear reseña:', error);
    throw error;
  }
};

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

export const fetchUserFavorites = async () => {
  try {
    const { data } = await api.get('/favorites');
    return data;
  } catch (error) {
    console.error('Error al obtener películas favoritas:', error);
    return [];
  }
};

export const addFavorite = async (movieId) => {
  try {
    const { data } = await api.post('/favorites', { movie_id: movieId });
    return data;
  } catch (error) {
    console.error('Error al agregar película favorita:', error);
    throw error;
  }
};

export const removeFavorite = async (movieId) => {
  try {
    const { data } = await api.delete(`/favorites/${movieId}`);
    return data;
  } catch (error) {
    console.error('Error al eliminar película favorita:', error);
    throw error;
  }
};


export const fetchUserWatchLater = async () => {
  try {
    const { data } = await api.get('/watch-later');
    return data;
  } catch (error) {
    console.error('Error al obtener lista de ver después:', error);
    return [];
  }
};

export const addToWatchLater = async (movieId) => {
  try {
    const { data } = await api.post('/watch-later', { movie_id: movieId });
    return data;
  } catch (error) {
    console.error('Error al agregar a ver después:', error);
    throw error;
  }
};

export const removeFromWatchLater = async (movieId) => {
  try {
    const { data } = await api.delete(`/watch-later/${movieId}`);
    return data;
  } catch (error) {
    console.error('Error al eliminar de ver después:', error);
    throw error;
  }
};


export const fetchUserWatched = async () => {
  try {
    const { data } = await api.get('/watched');
    return data;
  } catch (error) {
    console.error('Error al obtener lista de vistas:', error);
    return [];
  }
};

export const addToWatched = async (movieId) => {
  try {
    const { data } = await api.post('/watched', { movie_id: movieId });
    return data;
  } catch (error) {
    console.error('Error al marcar como vista:', error);
    throw error;
  }
};

export const removeFromWatched = async (movieId) => {
  try {
    const { data } = await api.delete(`/watched/${movieId}`);
    return data;
  } catch (error) {
    console.error('Error al desmarcar como vista:', error);
    throw error;
  }
};