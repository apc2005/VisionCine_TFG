import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies, onMovieSelect, title }) => {
  const defaultImage = '/assets/noImage.png'; 

  const handleClick = (movie) => {
    console.log('Movie clicked:', movie);
    onMovieSelect(movie);
  };

  return (
    <div>
      <h2>{title}</h2>
      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No hay películas para mostrar</p>
        ) : (
          movies.map((movie, index) => (
            <div key={`${movie.id}-${index}`} className="movie-card" onClick={() => handleClick(movie)}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={movie.poster_path ? `https://image.tmdb.org/t/p/w200${movie.poster_path}` : defaultImage}
                  alt={movie.title}
                />
                <div className="movie-info">
                  <h3>{movie.title}</h3>
                  <p>{movie.release_date}</p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MovieList;