import { useState, useEffect } from 'react';
import { fetchUserWatchLater, fetchUserWatched, addToWatchLater, addToWatched, fetchMovieDetails } from '../api/backendApi';

const useMovieList = () => {
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      const watchLaterData = await fetchUserWatchLater();
      const watchLaterFull = await Promise.all(watchLaterData.map(async (movie) => {
        const fullDetails = await fetchMovieDetails(movie.movie_id);
        return fullDetails || movie;
      }));
      setWatchLaterList(watchLaterFull);

      const watchedData = await fetchUserWatched();
      const watchedFull = await Promise.all(watchedData.map(async (movie) => {
        const fullDetails = await fetchMovieDetails(movie.movie_id);
        return fullDetails || movie;
      }));
      setWatchedList(watchedFull);
    };
    fetchLists();
  }, []);

  const saveToWatchLater = async (movie) => {
    try {
      await addToWatchLater(movie.id);
      setWatchLaterList((prevWatchLaterList) => {
        if (!prevWatchLaterList.find((m) => m.id === movie.id)) {
          return [...prevWatchLaterList, movie];
        }
        return prevWatchLaterList;
      });
      setWatchedList((prevWatchedList) => prevWatchedList.filter((m) => m.id !== movie.id));
    } catch (error) {
      console.error('Error al agregar a ver después:', error);
    }
  };

  const markAsWatched = async (movie) => {
    try {
      await addToWatched(movie.id);
      setWatchedList((prevWatchedList) => {
        if (!prevWatchedList.find((m) => m.id === movie.id)) {
          return [...prevWatchedList, movie];
        }
        return prevWatchedList;
      });
      setWatchLaterList((prevWatchLaterList) => prevWatchLaterList.filter((m) => m.id !== movie.id));
    } catch (error) {
      console.error('Error al marcar como vista:', error);
    }
  };

  return {
    watchLaterList,
    watchedList,
    saveToWatchLater,
    markAsWatched
  };
};

export default useMovieList;
