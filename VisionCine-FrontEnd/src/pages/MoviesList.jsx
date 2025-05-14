import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import MovieList from '../components/MovieList';

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getAuthToken = () => localStorage.getItem('token');

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8000/api/movies', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(response.data);
    } catch {
      setError('Error fetching movies');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const handleMovieSelect = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Movies List</h1>
      <MovieList movies={movies} onMovieSelect={handleMovieSelect} title="Películas" />
    </div>
  );
};

export default MoviesList;
