import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import MovieList from '../components/MovieList';
import '../styles/Profile.css';


const Profile = () => {
  const { user, logout, favorites, refreshFavorites } = useContext(AuthContext);
  const [preview] = useState(user?.profile_picture || null);

  useEffect(() => {
    if (typeof refreshFavorites === 'function') {
      refreshFavorites();
    }
  }, [refreshFavorites]);

  if (!user) {
    return <div>Loading...</div>;
  }


  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-avatar">
          {preview ? (
            <img src={preview} alt="Profile" className="profile-image" />
          ) : (
            user?.email?.charAt(0).toUpperCase() || 'U'
          )}
        </div>
        <h2>Mi Perfil</h2>
        <div className="profile-info">
          <p><strong>Email:</strong> {user?.email || 'No disponible'}</p>
          {user?.name && <p><strong>Nombre:</strong> {user.name}</p>}
        </div>
      </div>

      <div className="favorites-section">
         <MovieList movies={Array.isArray(favorites) ? favorites : []} onMovieSelect={() => {}} title="Tus películas favoritas" small />
      </div>

      <div className="profile-actions">
        <button className="logout-btn" onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default Profile;
