import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
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
import RootRedirect from './components/RootRedirect';
import MoviesCRUD from './pages/MoviesCRUD';
import MoviesEdit from './pages/MoviesEdit';
import UsersCRUD from './pages/UsersCRUD';
import UserEdit from './pages/UserEdit';
import './styles/App.css';
import './styles/fixHeaderOverlap.css';

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const { watchLaterList, watchedList, saveToWatchLater, markAsWatched } = useMovieList();
  const { setInput, searchResults, isLoading } = useBackendMovies();

  const handleSearchChange = (event) => {
    setInput(event.target.value);
  };

  const handleMovieSelect = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const hideHeaderPaths = ['/login', '/register'];
  const shouldHideHeader = hideHeaderPaths.includes(location.pathname);

  return (
    <div className="app">
      {!shouldHideHeader && <Header watchLaterList={watchLaterList} watchedList={watchedList} />}

      <main>
        <Routes>
          <Route path="/movie/:id" element={
            <MoviePage 
              addToWatchLater={saveToWatchLater} 
              addToWatched={markAsWatched} 
              goBackToList={() => navigate('/popular-movies')} 
            />
          } />
          <Route path="/watch-later" element={
            <ProtectedRoute>
              <WatchLater movies={watchLaterList} onMovieSelect={handleMovieSelect} />
            </ProtectedRoute>
          } />
          <Route path="/watched" element={
            <ProtectedRoute>
              <Watched movies={watchedList} onMovieSelect={handleMovieSelect} />
            </ProtectedRoute>
          } />
          <Route path="/search" element={
            <ProtectedRoute>
              <Search movies={{ pages: [{ results: searchResults }] }} handleSearchChange={handleSearchChange} onMovieSelect={handleMovieSelect} />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/popular-movies" element={
            <ProtectedRoute>
              <PopularMovies popularMovies={{ pages: [{ results: searchResults }] }} onMovieSelect={handleMovieSelect} />
            </ProtectedRoute>
          } />
          <Route path="/home" element={
            <ProtectedRoute>
              <Home onMovieSelect={handleMovieSelect} />
            </ProtectedRoute>
          } />
          <Route path="/movies-crud" element={
            <ProtectedRoute>
              <MoviesCRUD />
            </ProtectedRoute>
          } />
          <Route path="/movies/edit/:id" element={
            <ProtectedRoute>
              <MoviesEdit />
            </ProtectedRoute>
          } />
          <Route path="/movies/edit" element={
            <ProtectedRoute>
              <MoviesEdit />
            </ProtectedRoute>
          } />
          <Route path="/users-crud" element={
            <ProtectedRoute>
              <UsersCRUD />
            </ProtectedRoute>
          } />
          <Route path="/users/edit/:id" element={
            <ProtectedRoute>
              <UserEdit />
            </ProtectedRoute>
          } />
          <Route path="/users/edit" element={
            <ProtectedRoute>
              <UserEdit />
            </ProtectedRoute>
          } />
          <Route path="/" element={<RootRedirect />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
        </Routes>
      </main>
    </div>
  );
}

export default App;
