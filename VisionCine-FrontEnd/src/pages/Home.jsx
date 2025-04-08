import React from "react";
import MovieList from "../components/MovieList";
import { usePopularMovies } from "../api/moviesApi"; 
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Carousel from "../components/Carrousel";
import Footer from "../components/Footer";

const Home = () => {
  const { data, isLoading } = usePopularMovies();
  const movies = data?.results || []; 
  
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/movie/${movie.id}`);
  };

  const topMovies = movies.slice(0, 5);

  return (
    <div className="home">
      <div className="banner">
        {isLoading ? <p>Cargando...</p> : <Carousel movies={movies} />}
      </div>

      <section className="intro">
        <h2 className="intro-title">Bienvenido a VisionCine</h2>
        <div className="intro-grid">
          <div className="intro-card">
            <img src="/assets/jam--write-f.svg" alt="Escribir" />
            Llevar un registro de todas las películas que has visto (o empezar desde el día que te unes).
          </div>
          <div className="intro-card">
            <img src="/assets/material-symbols--share.svg" alt="Compartir" />
            Escribir y compartir críticas, y seguir a tus amigos para leer las suyas.
          </div>
          <div className="intro-card">
            <img src="/assets/mdi--heart.svg" alt="Favoritos" />
            Mostrar tu apoyo a tus películas y críticas favoritas con un "me gusta".
          </div>
          <div className="intro-card">
            <img src="/assets/ic--baseline-reviews.svg" alt="Listas" />
            Crear listas personalizadas de películas y llevar un registro de las que aún te falta por ver.
          </div>
        </div>
      </section>

      <section className="reviews">
        <h2 className="reviews-title">Reseñas de la aplicación</h2>
        <div className="reviews-card">
          <div className="reviews-stars">
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} className="reviews-star" />
            ))}
          </div>
          <p>
            Me encanta esta aplicación, tiene todas mis películas favoritas y la interfaz es increíble. ¡Recomendada!
          </p>
        </div>
      </section>

      <MovieList movies={topMovies} onMovieSelect={handleMovieClick} title="Tus Top 5 Películas" />

      <Footer />
    </div>
  );
};

export default Home;