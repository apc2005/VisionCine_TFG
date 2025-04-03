import React from 'react';
import MovieDetailsWrapper from '../components/MovieDetailsWrapper';

function MovieDetails({ goBackToList }) {
  return (
    <div>
      <button className="back-button" onClick={goBackToList}>
        Back
      </button>
      <MovieDetailsWrapper />
    </div>
  );
}

export default MovieDetails;
