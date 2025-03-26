import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://tu-dominio.com/api'; // Reemplaza con la URL de tu backend

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.get(`${API_URL}/sanctum/csrf-cookie`, { withCredentials: true });
      const response = await axios.post(
        `${API_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      console.log('Usuario autenticado:', response.data.user);
      // Maneja el estado de autenticación en tu aplicación
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Contraseña:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
};

export default Login;
