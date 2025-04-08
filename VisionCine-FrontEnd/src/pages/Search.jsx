import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import MovieList from '../components/MovieList';

const Search = ({ movies = [], onMovieSelect }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const filteredMovies = Array.isArray(movies)
    ? movies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
    : [];

  const handleSearch = (newQuery) => {
    setSearchParams(newQuery ? { q: newQuery } : {});
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} initialQuery={query} />

        <MovieList movies={filteredMovies} onMovieSelect={onMovieSelect} title="Resultados de Búsqueda" />
    </div>
  );
};

export default Search;