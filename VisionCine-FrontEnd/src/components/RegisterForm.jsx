import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { register } from '../api/backendApi';
import '../styles/Login.css';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register({ name, email, password, password_confirmation: passwordConfirmation });
      setSuccess(true);
      setError(null);
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setSuccess(false);
      setError(error.response?.data?.message || 'Error en el registro');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Registrarse</h2>
        {success && <p style={{ color: 'green' }}>¡Registro exitoso! Redirigiendo al inicio de sesión...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="p-field">
            <label>Nombre</label>
            <InputText 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
            />
          </div>
          <div className="p-field">
            <label>Correo electrónico</label>
            <InputText 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>
          <div className="p-field">
            <label>Contraseña</label>
            <InputText 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </div>
          <div className="p-field">
            <label>Confirmar contraseña</label>
            <InputText 
              type="password" 
              value={passwordConfirmation} 
              onChange={(e) => setPasswordConfirmation(e.target.value)} 
              required 
            />
          </div>
          <Button type="submit" label="Registrarse" />
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
