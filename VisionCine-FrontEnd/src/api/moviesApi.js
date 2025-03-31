import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        language: 'es-ES',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error al buscar películas:', error);
    return [];
  }
};

export const useSearchMovies = (query) => {
  return useQuery(['searchMovies', query], () => searchMovies(query), {
    enabled: !!query,
  });
};

export const fetchPopularMovies = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'es-ES',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error al obtener películas populares:', error.response ? error.response.data : error);
    return [];
  }
};

export const usePopularMovies = () => {
  return useQuery('popularMovies', fetchPopularMovies);
};

export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'es-ES',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener los detalles de la película:', error);
    return null;
  }
};

export const useMovieDetails = (id) => {
  return useQuery(['movieDetails', id], () => fetchMovieDetails(id), {
    enabled: !!id,
  });
};
