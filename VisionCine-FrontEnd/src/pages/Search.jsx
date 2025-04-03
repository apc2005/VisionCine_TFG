import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const Search = ({ movies = [], onMovieSelect }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  console.log('Movies:', movies); 

  const filteredMovies = Array.isArray(movies)
    ? movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSearch = (newQuery) => {
    setSearchParams(newQuery ? { q: newQuery } : {});
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} initialQuery={query} />
      {query.length >= 3 && filteredMovies.length > 0 ? (
        <MovieList movies={filteredMovies} onMovieSelect={onMovieSelect} title="Resultados de Búsqueda" />
      ) : (
        <p>No hay resultados para tu búsqueda.</p>
      )}
    </div>
  );
};

export default Search;
