import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import MovieDetails from './MovieDetails';

const fetchMovieDetails = async (id) => {
  const apiKey = import.meta.env.VITE_API_KEY;
  const baseUrl = import.meta.env.VITE_BASE_URL;
  const response = await fetch(`${baseUrl}/movie/${id}?api_key=${apiKey}&language=es-ES`);

  if (!response.ok) {
    throw new Error('Error al obtener los detalles de la película');
  }

  return response.json();
};

const MovieDetailsWrapper = ({ addToWatchLater, addToWatched }) => {
  const { id } = useParams();

  const { data: movie, isLoading, error } = useQuery({
    queryKey: ['movieDetails', id],
    queryFn: () => fetchMovieDetails(id),
  });

  if (isLoading) return <p>Cargando detalles...</p>;
  if (error) return <p>Error cargando los detalles</p>;

  return (
    <MovieDetails
      movie={movie}
      addToWatchLater={addToWatchLater}
      addToWatched={addToWatched}
    />
  );
};

export default MovieDetailsWrapper;
