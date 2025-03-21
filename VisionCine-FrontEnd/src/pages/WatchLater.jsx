import React from 'react';
import MovieList from '../components/MovieList';

const WatchLater = ({ movies, onMovieSelect }) => (
  <div>
    <MovieList movies={movies} onMovieSelect={onMovieSelect} title="Guardadas para Ver" />
  </div>
);

export default WatchLater;
