import React, { useState, useEffect, useCallback } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieList from '../components/MovieList';
import axios from 'axios';

const PopularMovies = ({ onPopularMovieSelect }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const getAuthToken = () => localStorage.getItem('token');

  const fetchMovies = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8000/api/movies', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: pageNumber, per_page: 10 },
      });
      const data = response.data;
      if (pageNumber === 1) {
        setMovies(data.data);
      } else {
        setMovies((prev) => [...prev, ...data.data]);
      }
      setHasMore(data.current_page < data.last_page);
      setPage(data.current_page);
      setError(null);
    } catch (err) {
      setError('Error fetching popular movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const loadMoreMovies = () => {
    if (!loading && hasMore) {
      fetchMovies(page + 1);
    }
  };

  if (loading && page === 1) {
    return <p>Cargando películas populares...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={movies.length}
        next={loadMoreMovies}
        hasMore={hasMore}
        loader={<h4>Cargando más películas...</h4>}
        endMessage={<p>No hay más películas populares.</p>}
      >
        <MovieList movies={movies} onMovieSelect={onPopularMovieSelect} title="Películas Populares" />
      </InfiniteScroll>
    </div>
  );
};

export default PopularMovies;
