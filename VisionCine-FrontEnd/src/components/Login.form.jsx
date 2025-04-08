import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom"; // Para la redirección
import "../components/Login.css";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null); // Para manejar errores
  const navigate = useNavigate(); // Hook para redirigir

  const loginSubmit = async (event) => {
    event.preventDefault(); // Evitar el comportamiento por defecto del formulario (que es un GET)
    
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', {
        email,
        password
      });
  
      const token = response.data.token;
      if (token) {
        localStorage.setItem('token', token);
        console.log('Login exitoso, token:', token);
        navigate('/'); // Redirigir a la página principal después de iniciar sesión
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      if (error.response && error.response.status === 401) {
        setError("Credenciales incorrectas");
      } else {
        setError("Error en el inicio de sesión. Verifica tus credenciales.");
      }
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Iniciar sesión</h2>
        <form autoComplete="off" onSubmit={loginSubmit}>
          <div className="p-field">
            <label htmlFor="new-email">Correo electrónico</label>
            <InputText
              id="new-email"
              type="text"
              name="new-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="p-field">
            <label htmlFor="new-password">Contraseña</label>
            <InputText
              id="new-password"
              type="password"
              name="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="p-field">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            <label htmlFor="rememberMe" className="p-checkbox-label">Recuérdame</label>
          </div>

          <Button type="submit" label="Ingresar" />
        </form>
        
        {error && <p style={{ color: 'red' }}>{error}</p>} 
      </div>
    </div>
  );
};

export default LoginForm;
