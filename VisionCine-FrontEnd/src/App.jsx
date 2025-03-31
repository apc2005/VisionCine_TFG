import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar';
import './App.css';
import WatchLater from './pages/WatchLater';
import Watched from './pages/Watched';
import Search from './pages/Search';
import Home from './pages/Home';
import MovieDetailsWrapper from './components/MovieDetailsWrapper';
import useMovieList from './hooks/useMovieList'; 
import useSearchMovies from './hooks/useSearchMovies'; 

function App() {
  const [searchQuery] = useState('');
  const navigate = useNavigate();

  const { watchLaterList, watchedList, saveToWatchLater, markAsWatched } = useMovieList();
  const movies = useSearchMovies(searchQuery);

  const goBackToList = () => navigate(-1); 

  return (
    <div className="app">
      <header className="navbar">
        <nav>
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/search">Buscar</Link></li>
            <li><Link to="/watch-later">Ver mas tarde ({watchLaterList.length})</Link></li>
            <li><Link to="/watched">Vistas ({watchedList.length})</Link></li>
          </ul>
        </nav>
      </header>

<main>
  <Routes>
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
    <Route path="/search" element={<Search movies={movies} onMovieSelect={saveToWatchLater} />} />
    <Route path="/" element={<Home movies={movies} />} />
  </Routes>
</main>

    </div>
  );
}

export default App;
