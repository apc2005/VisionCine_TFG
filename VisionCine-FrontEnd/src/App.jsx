import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import WatchLater from './pages/WatchLater';
import Watched from './pages/Watched';
import Search from './pages/Search';
import Home from './pages/Home';
import MoviePage from './pages/MoviePage'; 
import Header from './components/Header'; 
import useMovieList from './hooks/useMovieList';
import useBackendMovies from './hooks/useBackendMovies';
import LoginPage from './pages/Login';
import RegisterForm from './components/RegisterForm';
import PopularMovies from './pages/PopularMovies';
import Profile from './pages/Profile';
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from './context/AuthProvider';

function App() {
  const navigate = useNavigate();
  const { watchLaterList, watchedList, saveToWatchLater, markAsWatched } = useMovieList();
  const { setInput, searchResults, isLoading } = useBackendMovies();
  const movies = { data: searchResults, isLoading };

  const handleSearchChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <AuthProvider>
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
            <Route path="/watch-later" element={
              <ProtectedRoute>
                <WatchLater movies={watchLaterList} />
              </ProtectedRoute>
            } />
            <Route path="/watched" element={
              <ProtectedRoute>
                <Watched movies={watchedList} />
              </ProtectedRoute>
            } />
            <Route path="/search" element={
              <ProtectedRoute>
                <Search movies={movies} onMovieSelect={saveToWatchLater} handleSearchChange={handleSearchChange} />
              </ProtectedRoute>
            } />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/popular-movies" element={
              <ProtectedRoute>
                <PopularMovies popularMovies={movies} onPopularMovieSelect={saveToWatchLater} />
              </ProtectedRoute>
            } />
            <Route path="/" element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
