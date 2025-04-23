import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import MovieDetails from '../components/MovieDetails';
import '../pages/MoviePage.css';

const MovieDetailsPage = ({ addToWatchLater, addToWatched, goBackToList }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`);
        const data = await response.json();
        setMovie(data);
      } catch (error) {
        console.error("Error al obtener detalles de la película:", error);
      }
    };

    fetchMovieDetails();
  }, [id]);

  if (!movie) return <p>Cargando detalles...</p>;

  return (
    <div className="movie-page">
      <button onClick={goBackToList}>Volver a la lista</button>
      <MovieDetails 
        movie={movie} 
        addToWatchLater={addToWatchLater} 
        addToWatched={addToWatched} 
      />
    </div>
  );
};

export default MovieDetailsPage;
