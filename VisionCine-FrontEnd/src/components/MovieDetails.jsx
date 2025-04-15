import React, { useState, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import './MovieDetails.css'; 

const MovieDetails = ({ movie, addToWatchLater, addToWatched }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [submitted, setSubmitted] = useState(false);
    const [reviews, setReviews] = useState([]);

    const addMovieToWatchLater = () => {
        addToWatchLater(movie);
        alert(`La película "${movie.title}" se ha agregado a "Ver más tarde"!`);
    };

    const markAsWatched = () => {
        addToWatched(movie);
        alert(`La película "${movie.title}" se ha marcado como vista!`);
    };

    const { authToken } = useContext(AuthContext);

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

        fetchReviews();
    }, [movie.id, submitted]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch('http://localhost:8000/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify({
                    movie_id: movie.id,
                    rating: parseInt(rating),
                    comment: comment
                })
            });

            if (!response.ok) throw new Error('Error al enviar la reseña');
            
            await response.json(); // Solo verificamos que la respuesta es válida
            setSubmitted(true);
            markAsWatched();
            alert('¡Reseña enviada con éxito!');
            // Resetear el formulario después de enviar
            setComment('');
            setRating(1);
            
        } catch (error) {
            console.error('Error:', error);
            alert('Debes iniciar sesión para enviar reseñas');
        }
    };

    return (
        <div className="movie-details">
            <h2>{movie.title}</h2>
            <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={`Poster de ${movie.title}`}
            />
            <p>{movie.overview}</p>

            <div className="actions">
                <button onClick={addMovieToWatchLater}>Agregar a ver más tarde</button>
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
                        <label>Calificación (1 a 5):</label>
                        <select
                            value={rating}
                            onChange={(e) => setRating(e.target.value)}
                            required
                        >
                            <option value="1">1 ⭐</option>
                            <option value="2">2 ⭐</option>
                            <option value="3">3 ⭐</option>
                            <option value="4">4 ⭐</option>
                            <option value="5">5 ⭐</option>
                        </select>
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
