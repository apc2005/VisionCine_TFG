import { createContext, useState, useEffect } from 'react';
import { fetchUserFavorites, fetchMovieDetails, api, getProfileData } from '../api/backendApi';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);
  const [watched, setWatched] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loadUserLists, setLoadUserLists] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if(token) {
      getProfileData()
        .then(userData => {
          setUser({ token, ...userData });
          setLoadUserLists(true);
          refreshReviews();
        })
        .catch(error => {
          console.error('Error fetching profile data:', error);
        });
    }
  }, []);

  useEffect(() => {
    if (loadUserLists) {
      refreshFavorites();
      refreshWatchLater();
      refreshWatched();
    }
  }, [loadUserLists]);

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
    if (!user?.token || !loadUserLists) return;
    try {
      const favs = await fetchUserFavorites();
      setFavorites(favs);
    } catch (error) {
      console.error('Error refreshing favorites:', error);
    }
  };

  const refreshWatchLater = async () => {
    if (!user?.token || !loadUserLists) return;
    try {
      const { data } = await api.get('/watch-later');
      setWatchLater(data);
    } catch (error) {
      console.error('Error refreshing watch later:', error);
    }
  };

  const refreshWatched = async () => {
    if (!user?.token || !loadUserLists) return;
    try {
      const { data } = await api.get('/watched');
      setWatched(data);
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

  const isAdmin = () => {
    return user?.role_name === 'admin';
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
