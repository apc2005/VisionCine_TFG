import React, { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import axios from "axios";
import { BASE_URL } from "../api/backendApi";
import { AuthContext } from "../context/AuthContext";

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const loginSubmit = async (event) => {
    event.preventDefault();
    
    try {
      const payload = {
        email: email.trim(),
        password: password.trim()
      };
      
      const response = await axios.post(`${BASE_URL}/login`, payload);
  
      if (response.data.access_token) {
        console.log('Login exitoso', {email});
        await login(response.data.access_token, response.data.user); // Pasar token y usuario por separado al AuthContext
        navigate('/');
      } else {
        console.log('Error: No se recibió token del servidor');
        setError("Error en el inicio de sesión. Intente nuevamente.");
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

        <div className="register-link">
          <p>¿No tienes una cuenta? <a href="/register">Regístrate aquí</a></p>
        </div>
      </div>
    </div>

  );
};

export default LoginForm;