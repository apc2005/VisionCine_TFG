import React, { useState, useEffect } from 'react';
import '../styles/Carrousel.css';

const Carousel = ({ movies }) => {
  const [currentIndex, setCurrentIndex] = useState(0);


  const images = movies
    .filter(movie => movie.backdrop_path) 
    .map(movie => `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`);


  useEffect(() => {
    if (images.length > 0) {  
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 3000); 

      return () => clearInterval(interval); 
    }
  }, [images.length]);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  if (images.length === 0) {
    return <div>No hay imágenes disponibles para mostrar.</div>;
  }

  return (
    <div className="carousel">
      <div className="carousel-images">
        <img src={images[currentIndex]} alt="Banner" className="carousel-img" />
      </div>
      <div className="carousel-controls">
        <button className="carousel-button prev" onClick={goToPrevious}>{"<"}</button>
        <button className="carousel-button next" onClick={goToNext}>{">"}</button>
      </div>
    </div>
  );
};

export default Carousel;
