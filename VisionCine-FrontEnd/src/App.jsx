import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate, useSearchParams } from 'react-router-dom';
import './App.css';
import WatchLater from './pages/WatchLater';
import Watched from './pages/Watched';
import Search from './pages/Search';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage'; 
import Header from './components/Header'; 
import useMovieList from './hooks/useMovieList';
import useSearchMovies from './hooks/useSearchMovies';
import LoginPage from './pages/Login';
import PopularMovies from './pages/PopularMovies';
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const { watchLaterList, watchedList, saveToWatchLater, markAsWatched } = useMovieList();

  const queryFromUrl = searchParams.get('q') || '';
  const movies = useSearchMovies(queryFromUrl);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        setSearchParams({ q: searchQuery });
      } else {
        setSearchParams({});
      }
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, setSearchParams]);

  return (
    <div className="app">
      <Header watchLaterList={watchLaterList} watchedList={watchedList} />

      <main>
        <Routes>
          <Route path="/movie/:id" element={
            <MoviePage 
              addToWatchLater={saveToWatchLater} 
              addToWatched={markAsWatched} 
              goBackToList={() => navigate('/search')} 
            />
          } />
          <Route path="/watch-later" element={<WatchLater movies={watchLaterList} />} />
          <Route path="/watched" element={<Watched movies={watchedList} />} />
          <Route path="/search" element={<Search movies={movies} onMovieSelect={saveToWatchLater} handleSearchChange={handleSearchChange} />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/search" element={<Search movies={movies} onMovieSelect={saveToWatchLater} />} />
          <Route path="/popular-movies" element={<PopularMovies popularMovies={movies} onPopularMovieSelect={saveToWatchLater} />} />
          <Route path="/" element={
            <Home /> 
        }
      />
    </Routes>
      </main>
    </div>
  );
}

export default App;
