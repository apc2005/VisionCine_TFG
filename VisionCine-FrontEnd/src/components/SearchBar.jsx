import { useState } from 'react';
import useMovies from '../hooks/useMovies';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

const SearchBar = () => {
  const { 
    input, 
    setInput, 
    searchResults, 
    popularMovies, 
    isLoading, 
    error, 
    isFetchingNextPage, 
    observerRef 
  } = useMovies();

  const [selectedMovie, setSelectedMovie] = useState(null);

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setSelectedMovie(null);
  };

  return (
    <div>
      <form className="search-bar">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={input}
          onChange={handleInputChange}
        />
      </form>

      {isLoading && <p>Cargando búsqueda...</p>}
      {error && <p>Error: {error.message}</p>}

      {!selectedMovie && input.length >= 3 && searchResults?.length > 0 && (
        <MovieList movies={searchResults} onMovieSelect={setSelectedMovie} title="Resultados de búsqueda" />
      )}

      {!selectedMovie && input.length < 3 && popularMovies && (
        <>
          {popularMovies.pages.map((page, index) => (
            <MovieList
              key={index}
              movies={page.results}
              onMovieSelect={setSelectedMovie}
              title={index === 0 ? "Películas populares" : ""}
            />
          ))}
          <div ref={observerRef} style={{ height: '20px', marginBottom: '20px' }} />
          {isFetchingNextPage && <p>Cargando más películas...</p>}
        </>
      )}
    </div>
  );
};

export default SearchBar;
