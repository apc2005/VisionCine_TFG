import React, { useState, useRef, useEffect } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import MovieList from './MovieList';
import MovieDetails from './MovieDetails';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchMovies = async (query) => {
  if (!query) return [];
  const res = await fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Error al obtener películas');
  const data = await res.json();
  return data.results;
};

const fetchPopularMovies = async ({ pageParam = 1 }) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageParam}`);
  if (!res.ok) throw new Error('Error al obtener películas populares');
  const data = await res.json();
  return { results: data.results, nextPage: data.page < data.total_pages ? data.page + 1 : null };
};

const SearchBar = () => {
  const [input, setInput] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const observerRef = useRef(null);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['movies', input],
    queryFn: () => fetchMovies(input),
    enabled: input.length >= 3,
    keepPreviousData: true,
  });

  const {
    data: popularMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: input.length < 3, 
  });

  const handleInputChange = (event) => {
    setInput(event.target.value);
    setSelectedMovie(null); 
  };

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  useEffect(() => {
    if (!observerRef.current || input.length >= 3) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, input]);

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
        <MovieList movies={searchResults} onMovieSelect={handleMovieClick} title="Resultados de búsqueda" />
      )}

      {!selectedMovie && input.length < 3 && popularMovies && (
        <>
          {popularMovies.pages.map((page, index) => (
            <MovieList key={index} movies={page.results} onMovieSelect={handleMovieClick} title="Películas populares" />
          ))}
          <div ref={observerRef} style={{ height: '20px', marginBottom: '20px' }} />
          {isFetchingNextPage && <p>Cargando más películas...</p>}
        </>
      )}

      {selectedMovie && (
        <MovieDetails movie={selectedMovie} addToWatchLater={() => {}} addToWatched={() => {}} />
      )}
    </div>
  );
};

export default SearchBar;
