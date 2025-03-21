import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import './App.css';
import WatchLater from './pages/WatchLater';
import Watched from './pages/Watched';
import Search from './pages/Search';
import Home from './pages/Home';
import MovieDetails from './components/MovieDetails';
import useMovieList from './hooks/useMovieList'; 
import useSearchMovies from './hooks/useSearchMovies'; 
import { fetchPopularMovies } from './api/moviesApi';


function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMovie, setSelectedMovie] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { watchLaterList, watchedList, saveToWatchLater, markAsWatched } = useMovieList();
  const movies = useSearchMovies(searchQuery);

  const selectMovie = (movie) => setSelectedMovie(movie);

  const goBackToList = () => navigate('/');

  const showSearchBar = location.pathname === '/search';

  return (
    <div className="app">
      <header className="navbar">
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/search">Search</Link></li>
            <li><Link to="/watch-later">Watch Later ({watchLaterList.length})</Link></li>
            <li><Link to="/watched">Watched ({watchedList.length})</Link></li>
          </ul>
        </nav>
      </header>

      <main>
        {showSearchBar && <SearchBar onSearch={setSearchQuery} fetchPopularMovies={fetchPopularMovies} />}

        <Routes>
          <Route
            path="/movie/:id"
            element={
              selectedMovie && (
                <div>
                  <button className="back-button" onClick={goBackToList}>
                    Back
                  </button>
                  <MovieDetails
                    movie={selectedMovie}
                    addToWatchLater={saveToWatchLater}
                    addToWatched={markAsWatched}
                  />
                </div>
              )
            }
          />
          <Route path="/watch-later" element={<WatchLater movies={watchLaterList} onMovieSelect={selectMovie} />} />
          <Route path="/watched" element={<Watched movies={watchedList} onMovieSelect={selectMovie} />} />
          <Route path="/search" element={<Search movies={movies} onMovieSelect={selectMovie} />} />
          <Route path="/" element={<Home movies={movies} onMovieSelect={selectMovie} />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
