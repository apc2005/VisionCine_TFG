import React, { useState } from 'react';
import '../styles/StarRating.css'; 

const StarRating = ({ onRatingChange }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0); 


  const handleClick = (ratingValue) => {
    setRating(ratingValue);
    onRatingChange(ratingValue); 
  };

  const handleMouseEnter = (ratingValue) => {
    setHoverRating(ratingValue);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      const filled = i <= (hoverRating || rating) ? 'filled' : 'empty';
      stars.push(
        <span
          key={i}
          className={`star ${filled}`}
          onClick={() => handleClick(i)}
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          ★
        </span>
      );
    }
    return stars;
  };

  return (
    <div className="star-rating">
      {renderStars()}
    </div>
  );
};

export default StarRating;
