import { useState } from 'react';

const useMovieList = () => {
  const [watchLaterList, setWatchLaterList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);

  const saveToWatchLater = (movie) => {
    if (!watchLaterList.find((m) => m.id === movie.id)) {
      setWatchLaterList([...watchLaterList, movie]);
    }
  };

  const markAsWatched = (movie) => {
    if (!watchedList.find((m) => m.id === movie.id)) {
      setWatchedList([...watchedList, movie]);
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
