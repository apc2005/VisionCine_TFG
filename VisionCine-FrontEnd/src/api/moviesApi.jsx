import axios from 'axios';

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
    console.error('Error al obtener películas populares:', error);
    return [];
  }
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
