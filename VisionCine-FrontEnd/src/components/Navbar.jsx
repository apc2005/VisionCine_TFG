import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="header">
      <nav className="nav">
        <div className="nav-left">
          <div className={`menu-icon ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>

          </div>
        </div>
        <div className="nav-center">
          <img src="/assets/icon.png" className="icon" alt="logo" />
          <div className="page-title">VisiónCine</div>
        </div>
        <div className="nav-right">
          <div className="nav-item">
            <img src="/assets/mdi--user.svg" className="user-icon-small" alt="user" />
            Iniciar Sesión
          </div>
        </div>
      </nav>


      {isOpen && (
        <div className="dropdown-menu open">
          <ul>
            <li><Link to="/">Inicio</Link></li>
            <li><Link to="/buscar">Buscar</Link></li> 
            <li><Link to="/ver-mas-tarde">Ver más tarde</Link></li>
            <li><Link to="/vistos">Vistos</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
