import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

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
