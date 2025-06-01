import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import '../styles/MoviePage.css';
import StarRating from './StarRating';
import { 
  addFavorite, 
  removeFavorite, 
  addToWatchLater, 
  removeFromWatchLater, 
  addToWatched, 
  removeFromWatched,
  api
} from '../api/backendApi';
import { AuthContext } from '../context/AuthContext';

const MovieDetails = ({ movie }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { authToken, favorites, watchLater, watched, refreshFavorites, refreshWatchLater, refreshWatched } = useContext(AuthContext);

  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(null);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const movieId = movie.id;
        const { data } = await api.get(`/reviews/movie/${movieId}`);
        setReviews(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchReviews();
  }, [movie.id, submitted]);

  // Added useEffect to refresh watchLater and watched lists on mount or movie change
  useEffect(() => {
    if (authToken) {
      refreshWatchLater();
      refreshWatched();
    }
  }, [authToken, movie.id, refreshWatchLater, refreshWatched]);

  useEffect(() => {
    if (!authToken) return;

    const movieId = movie.id;
    setIsFavorite(favorites.some(fav => fav.id === movieId));
    setIsWatchLater(watchLater.some(item => item.id === movieId));
    setIsWatched(watched.some(item => item.id === movieId));
  }, [favorites, watchLater, watched, movie.id, authToken]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/reviews', {
        movie_id: movie.id,
        rating: rating,
        comment: comment
      });

      if (!response) throw new Error('Error al enviar la reseña');

      setSubmitted(true);
      handleMarkAsWatched();
      Swal.fire('¡Éxito!', 'Reseña enviada con éxito!', 'success');
      setComment('');
      setRating(1);
    } catch (error) {
      console.error('Error:', error);
      Swal.fire('Error', 'Error al enviar la reseña', 'error');
    }
  };

  const toggleFavorite = async () => {
    if (!authToken) {
      Swal.fire('Atención', 'Debes iniciar sesión para marcar favoritos', 'warning');
      return;
    }

    try {
      const movieId = movie.id;
      if (isFavorite) {
        await removeFavorite(movieId);
        Swal.fire('Éxito', 'Película eliminada de favoritas', 'success');
      } else {
        if (favorites.length >= 3) {
          Swal.fire('Atención', 'Solo puedes tener hasta 3 películas favoritas', 'warning');
          return;
        }
        await addFavorite(movieId);
        Swal.fire('Éxito', 'Película agregada a favoritas', 'success');
      }

      refreshFavorites();
    } catch (error) {
      console.error('Error al actualizar favoritas:', error);
      Swal.fire('Error', 'Error al actualizar favoritas', 'error');
    }
  };

  const handleAddToWatchLater = async () => {
    if (!authToken) {
      Swal.fire('Atención', 'Debes iniciar sesión para agregar a ver después', 'warning');
      return;
    }

    try {
      const movieId = movie.id;
      if (isWatchLater) {
        await removeFromWatchLater(String(movieId));
        Swal.fire('Éxito', 'Película eliminada de ver después', 'success');
      } else {
        await addToWatchLater(String(movieId));
        Swal.fire('Éxito', 'Película agregada a ver después', 'success');
      }
      refreshWatchLater();
    } catch (error) {
      console.error('Error al actualizar ver después:', error);
      if (error.response && error.response.status === 400) {
        console.warn('La película ya está en tu lista de ver más tarde');
      } else {
        Swal.fire('Error', 'Error al actualizar ver después', 'error');
      }
    }
  };

  const handleMarkAsWatched = async () => {
    if (!authToken) {
      Swal.fire('Atención', 'Debes iniciar sesión para marcar como vista', 'warning');
      return;
    }

    try {
      const movieId = movie.id;
      if (isWatched) {
        await removeFromWatched(movieId);
        Swal.fire('Éxito', 'Película desmarcada como vista', 'success');
      } else {
        await addToWatched(movieId);
        Swal.fire('Éxito', 'Película marcada como vista', 'success');
      }
      refreshWatched();
    } catch (error) {
      console.error('Error al actualizar visto:', error);
      Swal.fire('Error', 'Error al actualizar visto', 'error');
    }
  };

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w154${movie.poster_path}`}
        alt={`Poster de ${movie.title}`}
        style={{ maxWidth: '254px', height: 'auto' }}
      />

      <p className="movie-description">{movie.description || movie.overview || 'Sin descripción disponible.'}</p>

      <button onClick={toggleFavorite} className="favorite-btn">
        {isFavorite ? '❤️ Quitar de favoritas' : '🤍 Añadir a favoritas'}
      </button>

      <div className="actions">
        {isWatchLater !== null && (
          <button onClick={handleAddToWatchLater}>
            {isWatchLater ? 'Quitar de ver después' : 'Agregar a ver después'}
          </button>
        )}
        {isWatched !== null && (
          <button onClick={handleMarkAsWatched}>
            {isWatched ? 'Quitar de vista' : 'Agregar de vista'}
          </button>
        )}
      </div>

      <section className="review-section">
        <h3>Deja tu reseña y calificación</h3>
        <form onSubmit={handleReviewSubmit}>
          <div>
            <textarea
              className="textarea-estilizada"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Escribe tu comentario"
              rows="4"
              required
            ></textarea>
          </div>
          <div>
            <label>Calificación:</label>
            <StarRating onRatingChange={handleRatingChange} />
          </div>
          <button type="submit">Enviar</button>
        </form>

        {submitted && (
          <div className="user-review">
            <h4>Tu reseña:</h4>
            <p><strong>Comentario:</strong> {comment}</p>
            <p><strong>Calificación:</strong> {rating} ⭐</p>
          </div>
        )}
        <div className="existing-reviews">
          <h3>Reseñas de otros usuarios</h3>
          {reviews.length > 0 ? (
            reviews.map(review => (
              <div key={review.id} className="review-item">
                <p><strong>{review.user.name}:</strong> {review.comment}</p>
                <p>Calificación: {'⭐'.repeat(review.rating)}</p>
              </div>
            ))
          ) : (
            <p>No hay reseñas aún. ¡Sé el primero en opinar!</p>
          )}
        </div>
      </section>
    </div>
  );
};

export default MovieDetails;
