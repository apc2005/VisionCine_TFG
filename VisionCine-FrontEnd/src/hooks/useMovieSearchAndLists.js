import useMovieList from './useMovieList';
import useBackendMovies from './useBackendMovies';
import { useCallback } from 'react';

const useMovieSearchAndLists = () => {
  const { watchLaterList, watchedList, saveToWatchLater, markAsWatched } = useMovieList();
  const { setInput, searchResults, isLoading } = useBackendMovies();

  const handleSearchChange = useCallback((event) => {
    setInput(event.target.value);
  }, [setInput]);

  return {
    watchLaterList,
    watchedList,
    saveToWatchLater,
    markAsWatched,
    searchResults,
    isLoading,
    handleSearchChange,
  };
};

export default useMovieSearchAndLists;
