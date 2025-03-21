import React from 'react';
import MovieList from '../components/MovieList';

const Search = ({ movies, onMovieSelect }) => (
  <div>
    <MovieList movies={movies} onMovieSelect={onMovieSelect} title="Resultados de Búsqueda" />
  </div>
);

export default Search;
