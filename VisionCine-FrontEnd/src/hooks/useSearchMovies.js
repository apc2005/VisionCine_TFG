import { useQuery } from '@tanstack/react-query';
import { searchMovies } from '../api/moviesApi';

const useSearchMovies = (searchQuery) => {
  return useQuery({
    queryKey: ['searchMovies', searchQuery],
    queryFn: () => searchMovies(searchQuery),
    enabled: !!searchQuery?.trim(), 
    staleTime: 5 * 60 * 1000, 
    retry: 1, 
  });
};

export default useSearchMovies;
