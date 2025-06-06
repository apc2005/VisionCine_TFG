import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css'; 

const Header = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="navbar">
      <nav>
        <ul className="navbar-left">
          {user ? (
            <li className="dropdown">
              <button
                className={`dropdown-btn hamburger ${dropdownOpen ? 'open' : ''}`}
                onClick={toggleDropdown}
                aria-label="Toggle menu"
                aria-expanded={dropdownOpen}
              >
                <span className="bar1"></span>
                <span className="bar2"></span>
                <span className="bar3"></span>
              </button>
              {dropdownOpen && (
                <div className={`dropdown-content show`}>
                  <Link to="/" onClick={() => setDropdownOpen(false)}>Inicio</Link>
                  {isAdmin() && (
                    <>
                      <Link to="/admin/movies" onClick={() => setDropdownOpen(false)}>Gestión de Películas</Link>
                      <Link to="/admin/users" onClick={() => setDropdownOpen(false)}>Gestión de Usuarios</Link>
                    </>
                  )}
                  <Link to="/watch-later" onClick={() => setDropdownOpen(false)}>Ver Después</Link>
                  <Link to="/watched" onClick={() => setDropdownOpen(false)}>Vistas</Link>
                  <Link to="/profile" onClick={() => setDropdownOpen(false)}>Perfil</Link>
                  <Link to="/search" onClick={() => setDropdownOpen(false)}>Buscar</Link>
                  <Link to="/popular-movies" onClick={() => setDropdownOpen(false)}>Películas Populares</Link>
                </div>
              )}

            </li>
          ) : (
            <>
              <li><Link to="/login">Iniciar sesión</Link></li>
              <li><Link to="/register">Registrarse</Link></li>
            </>
          )}
        </ul>

        <ul className="navbar-center">
          <li className="title">
            <img src="/assets/icon.png" alt="Icono VisionCine" style={{ height: '24px', marginRight: '8px', verticalAlign: 'middle' }} />
            VisionCine
          </li>
        </ul>

        <ul className="navbar-right">
          {user ? (
            <li>Bienvenido, {user.email || user.name || 'Usuario'}</li>
          ) : null}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
