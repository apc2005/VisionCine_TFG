import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
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
  );
};

export default Footer;
