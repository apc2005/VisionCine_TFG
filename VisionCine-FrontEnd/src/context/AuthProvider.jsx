import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { BASE_URL } from '../api/backendApi';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('Token en localStorage:', token);
    
    if(token) {
      // Establecer usuario temporalmente mientras se verifica
      setUser({ token });
      
      const verifyToken = async () => {
        try {
          const response = await fetch(`${BASE_URL}/verify-token`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          
          if (response.ok) {
            const userData = await response.json();
            console.log('Token válido - usuario:', userData);
            setUser(prev => ({ ...prev, ...userData }));
          } else {
            console.log('Token inválido - limpiando');
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch (error) {
          console.error('Error al verificar token:', error);
          // Mantener la sesión aunque falle la verificación
          setUser({ token });
        }
      };
      
      verifyToken();
    } else {
      console.log('No hay token - limpiando estado');
      setUser(null);
    }
  }, []);

  const login = async (data) => {
    localStorage.setItem('token', data.access_token);
    // Asegurarse de que userData contiene el email
    const userObj = { 
      token: data.access_token,
      email: data.user?.email,
      name: data.user?.name
    };
    setUser(userObj);
    console.log('Usuario guardado en estado:', userObj);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
