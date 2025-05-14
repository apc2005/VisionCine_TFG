import React, { useState, useEffect, useContext } from 'react';
import Swal from 'sweetalert2';
import '../styles/MoviePage.css';
import StarRating from './StarRating';
import { 
  fetchUserFavorites, 
  addFavorite, 
  removeFavorite, 
  addToWatchLater, 
  removeFromWatchLater, 
  addToWatched, 
  removeFromWatched,
  fetchUserWatchLater,
  fetchUserWatched,
  api
} from '../api/backendApi';
import { AuthContext } from '../context/AuthContext';

const MovieDetails = ({ movie }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [isWatchLater, setIsWatchLater] = useState(null);
  const [isWatched, setIsWatched] = useState(null);
  const { authToken, refreshFavorites } = useContext(AuthContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await api.get(`/reviews/movie/${movie.id}`);
        setReviews(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchFavoriteStatus = async () => {
      if (!authToken) return;

      try {
        const favorites = await fetchUserFavorites();
        const isFav = favorites.some(fav => fav.id === movie.id);
        setIsFavorite(isFav);
      } catch (error) {
        console.error('Error al comprobar favoritos:', error);
      }
    };

    const checkWatchLaterAndWatchedStatus = async () => {
      if (!authToken) return;

      try {
        const watchLaterData = await fetchUserWatchLater();
        setIsWatchLater(watchLaterData.some(item => item.movie_id === movie.id));

        const watchedData = await fetchUserWatched();
        setIsWatched(watchedData.some(item => item.movie_id === movie.id));
      } catch (error) {
        console.error('Error al comprobar estado de ver después y visto:', error);
      }
    };

    fetchReviews();
    fetchFavoriteStatus();
    checkWatchLaterAndWatchedStatus();
  }, [movie.id, submitted, authToken]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/reviews', {
        tmdb_id: movie.tmdb_id,
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
      if (isFavorite) {
        await removeFavorite(movie.id);
        setIsFavorite(false);
        Swal.fire('Éxito', 'Película eliminada de favoritas', 'success');
      } else {
        const favorites = await fetchUserFavorites();
        if (favorites.length >= 3) {
          Swal.fire('Atención', 'Solo puedes tener hasta 3 películas favoritas', 'warning');
          return;
        }
        await addFavorite(movie.id);
        setIsFavorite(true);
        Swal.fire('Éxito', 'Película agregada a favoritas', 'success');
      }

      if (typeof refreshFavorites === 'function') {
        refreshFavorites();
      }
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
      if (isWatchLater) {
        await removeFromWatchLater(String(movie.id));
        setIsWatchLater(false);
        Swal.fire('Éxito', 'Película eliminada de ver después', 'success');
      } else {
        await addToWatchLater(String(movie.id));
        setIsWatchLater(true);
        Swal.fire('Éxito', 'Película agregada a ver después', 'success');
      }
    } catch (error) {
      console.error('Error al actualizar ver después:', error);
      if (error.response && error.response.status === 400) {
        // Manejar error 400 sin alertar al usuario
        console.warn('La película ya está en tu lista de ver más tarde');
        setIsWatchLater(true); // Sincronizar estado con backend
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
      if (isWatched) {
        await removeFromWatched(movie.id);
        setIsWatched(false);
        Swal.fire('Éxito', 'Película desmarcada como vista', 'success');
      } else {
        await addToWatched(movie.id);
        setIsWatched(true);
        Swal.fire('Éxito', 'Película marcada como vista', 'success');
      }
    } catch (error) {
      console.error('Error al actualizar visto:', error);
      Swal.fire('Error', 'Error al actualizar visto', 'error');
    }
  };

  return (
    <div className="movie-details">
      <h2>{movie.title}</h2>
      <img
        src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
        alt={`Poster de ${movie.title}`}
      />

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
            {isWatched ? 'Desmarcar como vista' : 'Marcar como vista'}
          </button>
        )}
      </div>

      <section className="review-section">
        <h3>Deja tu reseña y calificación</h3>
        <form onSubmit={handleReviewSubmit}>
          <div>
            <textarea
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
