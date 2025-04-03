// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = ({ watchLaterList, watchedList }) => {
  return (
    <header className="navbar">
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/search">Buscar</Link></li>
          <li><Link to="/watch-later">Ver más tarde ({watchLaterList.length})</Link></li>
          <li><Link to="/watched">Vistas ({watchedList.length})</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
