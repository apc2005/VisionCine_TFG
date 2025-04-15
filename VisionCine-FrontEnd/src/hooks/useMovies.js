import { useState, useEffect, useRef } from 'react';
import { useQuery, useInfiniteQuery } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import debounce from 'lodash/debounce';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = import.meta.env.VITE_BASE_URL;

const fetchMovies = async (query) => {
  if (!query) return [];
  const res = await fetch(`${BASE_URL}/search/movie?query=${query}&api_key=${API_KEY}`);
  if (!res.ok) throw new Error('Error al obtener películas');
  const data = await res.json();
  return data.results.filter(movie =>
    movie.title.toLowerCase().includes(query.toLowerCase())
  );
};

const fetchPopularMovies = async ({ pageParam = 1 }) => {
  const res = await fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageParam}`);
  if (!res.ok) throw new Error('Error al obtener películas populares');
  const data = await res.json();
  return { results: data.results, nextPage: data.page < data.total_pages ? data.page + 1 : null };
};

const useMovies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFromUrl = searchParams.get('q') || '';
  const [input, setInput] = useState(queryFromUrl);
  const [debouncedQuery, setDebouncedQuery] = useState(queryFromUrl);
  const observerRef = useRef(null);

  // Usando debounce de lodash
  const debouncedSearch = useRef(
    debounce((value) => setDebouncedQuery(value), 500)
  ).current;

  useEffect(() => {
    debouncedSearch(input);
    return () => debouncedSearch.cancel();  // Limpia el debounce al desmontar
  }, [input]);

  useEffect(() => {
    setSearchParams(debouncedQuery ? { q: debouncedQuery } : {});
  }, [debouncedQuery, setSearchParams]);

  const { data: searchResults, isLoading, error } = useQuery({
    queryKey: ['movies', debouncedQuery],
    queryFn: () => fetchMovies(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    keepPreviousData: true,
  });

  const {
    data: popularMovies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['popularMovies'],
    queryFn: fetchPopularMovies,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: debouncedQuery.length < 3,
  });

  useEffect(() => {
    if (!observerRef.current || debouncedQuery.length >= 3) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      },
      { threshold: 1 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage, debouncedQuery]);

  return {
    input,
    setInput,
    searchResults,
    popularMovies,
    isLoading,
    error,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    observerRef,
  };
};

export default useMovies;
