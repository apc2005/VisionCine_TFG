import React from 'react';
import { Link } from 'react-router-dom';

const MovieList = ({ movies, onMovieSelect, title }) => {
  const defaultImage = '/assets/noImage.png'; 

  return (
    <div>
      <h2>{title}</h2>
      <div className="movie-list">
        {movies.length === 0 ? (
          <p>No hay películas para mostrar</p>
        ) : (
          movies.map((movie) => (
            <div key={movie.id} className="movie-card" onClick={() => onMovieSelect(movie)}>
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
