import { createContext, useState, useEffect } from 'react';
import { fetchUserFavorites, fetchMovieDetails, api, getProfileData } from '../api/backendApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [watched, setWatched] = useState([]);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      getProfileData()
        .then(userData => {
          setUser({ token, ...userData });
          refreshFavorites();
          refreshWatchLater();
          refreshWatched();
          refreshReviews();
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, []);

  const login = async (token, userData) => {
    localStorage.setItem('token', token);
    setUser({ 
      token,
      ...userData 
    });
    refreshFavorites();
    refreshWatchLater();
    refreshWatched();
    refreshReviews();
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setFavorites([]);
    setWatchLater([]);
    setWatched([]);
    setReviews([]);
  };

  const refreshFavorites = async () => {
    if (!user?.token) return;
    try {
      const favs = await fetchUserFavorites();
      const detailedFavs = await Promise.all(
        favs.map(async (fav) => {
          const movieDetails = await fetchMovieDetails(fav.movie_id);
          return movieDetails;
        })
      );
      setFavorites(detailedFavs);
    } catch (error) {
      console.error('Error refreshing favorites:', error);
    }
  };

  const refreshWatchLater = async () => {
    if (!user?.token) return;
    try {
      const { data } = await api.get('/watch-later');
      const detailedWatchLater = await Promise.all(
        data.map(async (item) => {
          const movieDetails = await fetchMovieDetails(item.movie_id);
          return movieDetails;
        })
      );
      setWatchLater(detailedWatchLater);
    } catch (error) {
      console.error('Error refreshing watch later:', error);
    }
  };

  const refreshWatched = async () => {
    if (!user?.token) return;
    try {
      const { data } = await api.get('/watched');
      const detailedWatched = await Promise.all(
        data.map(async (item) => {
          const movieDetails = await fetchMovieDetails(item.movie_id);
          return movieDetails;
        })
      );
      setWatched(detailedWatched);
    } catch (error) {
      console.error('Error refreshing watched:', error);
    }
  };

  const refreshReviews = async () => {
    if (!user?.token) return;
    try {
      const { data } = await api.get('/reviews');
      setReviews(data);
    } catch (error) {
      console.error('Error refreshing reviews:', error);
    }
  };

  // Helper to check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  return (
    <AuthContext.Provider value={{ 
      user, authToken: user?.token, login, logout, 
      favorites, refreshFavorites, 
      watchLater, refreshWatchLater, 
      watched, refreshWatched, 
      reviews, refreshReviews,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
