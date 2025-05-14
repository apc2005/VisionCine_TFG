import { useState, useEffect, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { fetchMovies, searchMovies } from '../api/backendApi';

const useBackendMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  const [input, setInput] = useState(queryFromUrl);
  const [debouncedQuery, setDebouncedQuery] = useState(queryFromUrl);
  const observerRef = useRef(null);

  const debouncedSearch = useRef(
    debounce((value) => setDebouncedQuery(value), 500)
  ).current;

  useEffect(() => {
    debouncedSearch(input);
    return () => debouncedSearch.cancel();
  }, [input]);

  useEffect(() => {
    setSearchParams(debouncedQuery ? { q: debouncedQuery } : {});
  }, [debouncedQuery, setSearchParams]);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['movies', debouncedQuery],
    queryFn: () => searchMovies(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    keepPreviousData: true,
  });

  const { data: movies, isLoading: isLoadingMovies } = useQuery({
    queryKey: ['allMovies'],
    queryFn: fetchMovies,
    keepPreviousData: true,
  });

  return {
    input,
    setInput,
    searchResults: searchResults || [],
    popularMovies: { pages: [{ results: movies || [] }] },
    isLoading: isLoading || isLoadingMovies,
    error,
    observerRef,
  };
};

export default useBackendMovies;
