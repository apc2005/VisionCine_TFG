import React, { useState } from 'react';
import MovieList from '../components/MovieList';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import '../styles/SearchBar.css';

const Search = ({ onMovieSelect }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const [query, setQuery] = useState(initialQuery);
  const [movies, setMovies] = useState([]);

  const getAuthToken = () => localStorage.getItem('token');

  const fetchMovies = async (searchQuery) => {
    if (searchQuery.length < 3) {
      setMovies([]);
      return;
    }
    try {
      const token = getAuthToken();
      const response = await axios.get(`http://localhost:8000/api/movies/search/${searchQuery}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearchClick = () => {
    setSearchParams({ q: query });
    fetchMovies(query);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Buscar películas..."
          value={query}
          onChange={handleSearchChange}
          className="search-input"
        />
        <button onClick={handleSearchClick}>Buscar</button>
      </div>

        <MovieList movies={movies} onMovieSelect={onMovieSelect} title="Resultados de Búsqueda" />
    </div>
  );
};

export default Search;
