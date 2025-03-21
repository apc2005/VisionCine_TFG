import React, { useState } from 'react';
import './MovieDetails.css'; 

const MovieDetails = ({ movie, addToWatchLater, addToWatched }) => {
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(1);
    const [submitted, setSubmitted] = useState(false);

    const addMovieToWatchLater = () => {
        addToWatchLater(movie);
        alert(`La película "${movie.title}" se ha agregado a "Ver más tarde"!`);
    };

    const markAsWatched = () => {
        addToWatched(movie);
        alert(`La película "${movie.title}" se ha marcado como vista!`);
    };

    const handleReviewSubmit = (e) => {
        e.preventDefault();
        setSubmitted(true);  
        markAsWatched(); 
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
            </section>
        </div>
    );
};

export default MovieDetails;
