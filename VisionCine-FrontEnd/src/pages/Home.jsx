import React from "react";
import MovieList from "../components/MovieList";
import { usePopularMovies } from "../api/moviesApi"; 
import { useNavigate } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import Carousel from "../components/Carrousel";

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

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section footer-links">
            <h3 className="footer-title">Enlaces de Interés</h3>
            <ul>
              <li><a href="/about" className="footer-link">Sobre Nosotros</a></li>
              <li><a href="/contact" className="footer-link">Contacto</a></li>
              <li><a href="/privacy" className="footer-link">Política de Privacidad</a></li>
              <li><a href="/terms" className="footer-link">Condiciones de Uso</a></li>
              <li><a href="/legal" className="footer-link">Aviso Legal</a></li>
            </ul>
          </div>

          <div className="footer-section footer-social">
            <h3 className="footer-title">Síguenos</h3>
            <div className="footer-socials">
              <a href="#" className="social-link">
                <img src="/assets/fe--facebook.svg" className="social-icon" alt="Facebook" />
              </a>
              <a href="#" className="social-link">
                <img src="/assets/mdi--twitter.svg" className="social-icon" alt="Twitter" />
              </a>
              <a href="#" className="social-link">
                <img src="/assets/ri--instagram-fill.svg" className="social-icon" alt="Instagram" />
              </a>
            </div>
          </div>

          <div className="footer-section footer-contact">
            <h3 className="footer-title">Contacto</h3>
            <p className="footer-text">Correo: contacto@visioncine.com</p>
            <p className="footer-text">Teléfono: +34 912 345 678</p>
            <p className="footer-text">Dirección: Calle Ejemplo 123, Sevilla, España</p>
          </div>
        </div>

        <div className="footer-bottom">
          <p className="footer-text small-text">© 2025 Visioncine. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;