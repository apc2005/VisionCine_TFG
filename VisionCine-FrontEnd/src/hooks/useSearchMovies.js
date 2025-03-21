import { useState, useEffect } from 'react';
import { searchMovies, fetchPopularMovies } from '../api/moviesApi';

const useSearchMovies = (searchQuery) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    if (searchQuery.trim()) {
      searchMovies(searchQuery).then(setMovies);
    } else {
      fetchPopularMovies().then(setMovies);
    }
  }, [searchQuery]);

  return movies;
};

export default useSearchMovies;
