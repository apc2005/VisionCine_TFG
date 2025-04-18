import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const RootRedirect = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return null; // or a loading spinner component
  }

  if (user) {
    return <Navigate to="/home" replace />;
  } else {
    return <Navigate to="/login" replace />;
  }
};

export default RootRedirect;
