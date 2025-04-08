import { useState, useEffect } from 'react';
import useMovies from '../hooks/useMovies';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';
import './SearchBar.css';

const SearchBar = () => {
  const {
    input,
    setInput,
    searchResults,
    isLoading,
    error,
    popularMovies,
    isFetchingNextPage,
    observerRef,
  } = useMovies();

  const [tempInput, setTempInput] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [currentWord, setCurrentWord] = useState('película');
  const [isAnimating, setIsAnimating] = useState(false);

  const words = ['película', 'serie', 'documental', 'programa'];

  const handleTempInputChange = (event) => {
    setTempInput(event.target.value);
    setSelectedMovie(null);
  };

  const handleSearch = (event) => {
    event.preventDefault();
    setInput(tempInput);
  };

  useEffect(() => {
    let index = 0;

    const changeWord = () => {
      setIsAnimating(true);
      setTimeout(() => {
        index = (index + 1) % words.length;
        setCurrentWord(words[index]);
        setIsAnimating(false);
      }, 3000);
    };

    const interval = setInterval(changeWord, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <form className="search-bar" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Buscar películas..."
          value={tempInput}
          onChange={handleTempInputChange}
        />
        <button><i className="fas fa-search"></i> Buscar</button>
      </form>

      {isLoading && <p>Cargando búsqueda...</p>}
      {error && <p>Error: {error.message}</p>}

      {!selectedMovie && input.length >= 3 && searchResults?.length > 0 && (
        <MovieList
          movies={searchResults}
          onMovieSelect={setSelectedMovie}
          title="Resultados de búsqueda"
        />
      )}

      {!selectedMovie && input.length < 3 && !searchResults?.length && (
        <div className="no-results-message">
          <p className="fixed-text">Busca cualquier</p>
          <div className={`rotating-text-wrapper ${isAnimating ? 'animating' : ''}`}>
            {currentWord}
          </div>
        </div>
      )}

      {input.length < 3 && popularMovies?.length > 0 && (
        <div>
          <MovieList
            movies={popularMovies.results}
            onMovieSelect={setSelectedMovie}
            title="Películas Populares"
          />
          {isFetchingNextPage && <p>Cargando más...</p>}
          <div ref={observerRef}></div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
