// src/hooks/useMovies.js

import { useState, useCallback } from 'react';
import { searchMovies, fetchPopularMovies } from '../api/moviesApi'; 

export default function useMovies() {
  const [movies, setMovies] = useState([]);

  const fetchPopularMoviesHandler = useCallback(async () => {
    try {
      const results = await fetchPopularMovies(); 
      setMovies(results);  
    } catch (error) {
      console.error("Error al obtener películas populares:", error);
    }
  }, []);

  const fetchSearchMoviesHandler = useCallback(async (query) => {
    if (!query) return fetchPopularMoviesHandler();  
    try {
      const results = await searchMovies(query);  
      setMovies(results);  
    } catch (error) {
      console.error("Error al buscar películas:", error);
    }
  }, [fetchPopularMoviesHandler]);

  return { movies, fetchPopularMovies: fetchPopularMoviesHandler, fetchSearchMovies: fetchSearchMoviesHandler };
}
