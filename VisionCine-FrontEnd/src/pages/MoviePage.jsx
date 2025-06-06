import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';

const MoviePage = ({ goBackToList }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      try {
        const token = getAuthToken();
        const response = await fetch(`http://localhost:8000/api/movies/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Error fetching movie details');
        }
        const data = await response.json();
        setMovie(data);
        setError(null);
      } catch (error) {
        console.error("Error al obtener detalles de la película:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (loading) return <p>Cargando detalles...</p>;
  if (error) return <p>{error}</p>;
  if (!movie) return <p>No se encontró la película.</p>;

  return (
    <div className="movie-page">
      <button onClick={goBackToList}>Volver a la lista</button>
      <MovieDetails 
        movie={movie} 
      />
    </div>
  );
};

export default MoviePage;
