import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

const fetchMovies = async (query) => {
  const res = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=d8078dcf3ad27f6764916fc8b4496c95`);
  if (!res.ok) {
    throw new Error('Error fetching movies');
  }
  const data = await res.json();
  return data.results;
};

const fetchPopularMovies = async () => {
  const res = await fetch('https://api.themoviedb.org/3/movie/popular?api_key=d8078dcf3ad27f6764916fc8b4496c95');
  if (!res.ok) {
    throw new Error('Error fetching popular movies');
  }
  const data = await res.json();
  return data.results;
};

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { data: popularMovies, isLoading: isLoadingPopular } = useQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
    enabled: input.length === 0,
  });

  const { data, isLoading, error } = useQuery({
    queryKey: ['movies', input],
    queryFn: () => fetchMovies(input),
    enabled: input.length >= 3,
    keepPreviousData: true,
  });

  const handleInputChange = (event) => {
    const query = event.target.value;
    setInput(query);

    if (query.trim() === '' || query.length < 3) {
      return;
    }

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newTimeoutId = setTimeout(() => {
      setInput(query);
    }, 500);

    setTimeoutId(newTimeoutId);
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
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
      {error && <p>Error fetching data: {error.message}</p>}

      {data && data.length > 0 && !selectedMovie && (
        <MovieList
          movies={data}
          onMovieSelect={handleMovieClick}
          title="Películas encontradas"
        />
      )}

      {isLoadingPopular && <p>Cargando películas populares...</p>}

      {popularMovies && popularMovies.length > 0 && !selectedMovie && (
        <MovieList
          movies={popularMovies}
          onMovieSelect={handleMovieClick}
          title="Películas populares"
        />
      )}

      {selectedMovie && (
        <MovieDetails
          movie={selectedMovie}
          addToWatchLater={() => {}}
          addToWatched={() => {}}
        />
      )}
    </div>
  );
};

export default SearchBar;
