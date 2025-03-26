import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate, useLocation } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import './App.css';
import WatchLater from './pages/WatchLater';
import Watched from './pages/Watched';
import Search from './pages/Search';
import Home from './pages/Home';
import MovieDetailsWrapper from './components/MovieDetailsWrapper';
import useMovieList from './hooks/useMovieList'; 
import useSearchMovies from './hooks/useSearchMovies'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const { watchLaterList, watchedList, saveToWatchLater, markAsWatched } = useMovieList();
  const movies = useSearchMovies(searchQuery);

  const goBackToList = () => navigate(-1); // Vuelve a la página anterior

  const showSearchBar = location.pathname === '/search';

  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
          {showSearchBar && <SearchBar onSearch={setSearchQuery} />}

          <Routes>
            {/* Movie Details con el Wrapper */}
            <Route
              path="/movie/:id"
              element={
                <div>
                  <button className="back-button" onClick={goBackToList}>
                    Back
                  </button>
                  <MovieDetailsWrapper
                    addToWatchLater={saveToWatchLater}
                    addToWatched={markAsWatched}
                  />
                </div>
              }
            />

            <Route path="/watch-later" element={<WatchLater movies={watchLaterList} />} />
            <Route path="/watched" element={<Watched movies={watchedList} />} />
            <Route path="/search" element={<Search movies={movies} />} />
            <Route path="/" element={<Home movies={movies} />} />
          </Routes>
        </main>
      </div>
    </QueryClientProvider>
  );
}

export default App;
