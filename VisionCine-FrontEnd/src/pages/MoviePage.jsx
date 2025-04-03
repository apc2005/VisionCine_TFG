import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './MoviePage.css';
import StarRating from '../components/StarRating'; 

const MoviePage = ({ addToWatchLater, addToWatched, goBackToList }) => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [rating, setRating] = useState(null); 

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

  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log('Puntuación registrada:', newRating); 
  };

  if (!movie) return <p>Cargando detalles...</p>;

  return (
    <div className="movie-page">
      <button onClick={goBackToList}>Volver a la lista</button>
      <h2>{movie.title}</h2>
      <img 
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} 
        alt={movie.title} 
      />
      <p>{movie.overview}</p>

      <div className="actions">
        <button onClick={() => addToWatchLater(movie)}>Agregar a ver más tarde</button>
        <button onClick={() => addToWatched(movie)}>Marcar como vista</button>
      </div>

      <div className="reviews">
        <h3>Puntuación</h3>
        <StarRating onRatingChange={handleRatingChange} />
        {rating && <p>Puntuación registrada: {rating} estrellas</p>}
      </div>
    </div>
  );
};

export default MoviePage;
