import React, { useState, useEffect, useContext } from 'react';
import '../pages/MoviePage.css';
import StarRating from './StarRating';
import { fetchUserFavorites, addFavorite, removeFavorite } from '../api/backendApi';
import { AuthContext } from '../context/AuthContext';

const MovieDetails = ({ movie, addToWatchLater, addToWatched }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const { authToken, refreshFavorites } = useContext(AuthContext);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/reviews/movie/${movie.id}`);
        if (!response.ok) throw new Error('Error al obtener reseñas');
        const data = await response.json();
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

    fetchReviews();
    fetchFavoriteStatus();
  }, [movie.id, submitted, authToken]);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };

  const markAsWatched = () => {
    addToWatched(movie);
    alert(`La película "${movie.title}" se ha marcado como vista!`);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          movie_id: movie.id,
          rating: rating,
          comment: comment
        })
      });

      if (!response.ok) throw new Error('Error al enviar la reseña');

      await response.json();
      setSubmitted(true);
      markAsWatched();
      alert('¡Reseña enviada con éxito!');
      setComment('');
      setRating(1);
    } catch (error) {
      console.error('Error:', error);
      alert('Debes iniciar sesión para enviar reseñas');
    }
  };

  async function toggleFavorite() {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Debes iniciar sesión para marcar favoritos');
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite(movie.id);
        setIsFavorite(false);
        alert('Película eliminada de favoritas');
      } else {
        const favorites = await fetchUserFavorites();
        if (favorites.length >= 3) {
          alert('Solo puedes tener hasta 3 películas favoritas');
          return;
        }
        await addFavorite(movie.id);
        setIsFavorite(true);
        alert('Película agregada a favoritas');
      }


      if (typeof refreshFavorites === 'function') {
        refreshFavorites();
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(error.response.data.message);
      } else if (error.message) {
        alert(error.message);
      } else {
        alert('Error al actualizar favoritas');
      }
    }
  }

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
        <button onClick={() => addToWatchLater(movie)}>Agregar a ver más tarde</button>
        <button onClick={markAsWatched}>Marcar como vista</button>
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
