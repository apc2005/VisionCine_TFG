import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_KEY = 'd8078dcf3ad27f6764916fc8b4496c95';
const BASE_URL = 'https://api.themoviedb.org/3';


export const searchMovies = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query: query,
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
  return useQuery(
    ['searchMovies', query],  
    () => searchMovies(query), 
    {
      enabled: !!query,        
      staleTime: 1000 * 60 * 5, 
    }
  );
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
  return useQuery('popularMovies', fetchPopularMovies, {
    staleTime: 1000 * 60 * 10, 
    refetchOnWindowFocus: false, 
  });
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
  return useQuery(
    ['movieDetails', id],        
    () => fetchMovieDetails(id), 
    {
      enabled: !!id,            
      staleTime: 1000 * 60 * 10,  
    }
  );
};
