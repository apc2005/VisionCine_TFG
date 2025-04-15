import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Header = ({ watchLaterList, watchedList }) => {
  const { user } = useContext(AuthContext);

  return (
    <header className="navbar">
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/search">Buscar</Link></li>
          <li><Link to="/popular-movies">Películas Populares</Link></li>
          
          {user ? (
            <>
              <li><Link to="/watch-later">Ver más tarde ({watchLaterList.length})</Link></li>
              <li><Link to="/watched">Vistas ({watchedList.length})</Link></li>
              <li><Link to="/profile">Perfil</Link></li>
            </>
          ) : (
            <li><Link to="/login">Iniciar Sesión</Link></li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;