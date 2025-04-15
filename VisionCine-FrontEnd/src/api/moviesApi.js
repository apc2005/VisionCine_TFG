import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;


export const searchMovies = async (query) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        language: 'es-ES',
      },
    });
    return data?.results || []; 
  } catch (error) {
    console.error('Error al buscar películas:', error);
    return []; 
  }
};


export const useSearchMovies = (query) => {
  return useQuery({
    queryKey: ['searchMovies', query],
    queryFn: () => searchMovies(query),
    enabled: !!query, 
    keepPreviousData: true, 
  });
};


export const fetchPopularMovies = async (page = 1) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/popular`, {
      params: {
        api_key: API_KEY,
        language: 'es-ES',
        page,
      },
    });
    return data; 
  } catch (error) {
    console.error('Error al obtener películas populares:', error);
    return { results: [], total_pages: 1 }; 
  }
};


export const usePopularMovies = (page = 1) => {
  return useQuery({
    queryKey: ['popularMovies', page],
    queryFn: () => fetchPopularMovies(page),
    keepPreviousData: true, 
  });
};


export const fetchMovieDetails = async (id) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/movie/${id}`, {
      params: {
        api_key: API_KEY,
        language: 'es-ES',
      },
    });
    return data; 
  } catch (error) {
    console.error('Error al obtener los detalles de la película:', error);
    return null; 
  }
};


export const useMovieDetails = (id) => {
  return useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id),
    enabled: !!id, 
    keepPreviousData: true, 
  });
};
