import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const Search = ({ movies, onMovieSelect }) => {
  const [query, setQuery] = useState('');
  const filteredMovies = movies?.filter((movie) =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div>
      <SearchBar onSearch={setQuery} />
      <MovieList movies={filteredMovies} onMovieSelect={onMovieSelect} title="Resultados de Búsqueda" />
    </div>
  );
};

export default Search;
