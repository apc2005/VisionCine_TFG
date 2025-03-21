import React from 'react';
import MovieList from '../components/MovieList';

const Watched = ({ movies, onMovieSelect }) => (
  <div>
    <MovieList movies={movies} onMovieSelect={onMovieSelect} title="Películas Vistas" />
  </div>
);

export default Watched;
