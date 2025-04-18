import { useState, useEffect } from 'react';
import { AuthContext } from './AuthContext';
import { BASE_URL } from '../api/backendApi';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token) {
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
            setUser(prev => ({ ...prev, ...userData }));
          } else {
            localStorage.removeItem('token');
            setUser(null);
          }
        } catch {
          setUser({ token });
        } finally {
          setLoading(false);
        }
      };
      
      verifyToken();
    } else {
      setUser(null);
      setLoading(false);
    }
  }, []);

  const login = async (data) => {
    localStorage.setItem('token', data.access_token);

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
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
