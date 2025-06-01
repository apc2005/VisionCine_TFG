import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/Header.css'; 

const Header = ({ watchLaterList, watchedList }) => {
  const { user } = useContext(AuthContext);
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
                  <Link to="/home" onClick={() => setDropdownOpen(false)}>Inicio</Link>
                  <Link to="/movies-crud" onClick={() => setDropdownOpen(false)}>Gestión de Películas</Link>
                  <Link to="/users-crud" onClick={() => setDropdownOpen(false)}>Gestión de Usuarios</Link>
                  <Link to="/watch-later" onClick={() => setDropdownOpen(false)}>Ver Más Tarde ({watchLaterList.length})</Link>
                  <Link to="/watched" onClick={() => setDropdownOpen(false)}>Vistas ({watchedList.length})</Link>
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
          <li className="title">VisionCine</li>
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
