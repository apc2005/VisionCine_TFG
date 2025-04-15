import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import './Profile.css';
import './ProfileUpload.css';
import axios from 'axios';
import { BASE_URL } from '../api/backendApi';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [profilePicture, setProfilePicture] = useState(null);
  const [preview, setPreview] = useState(user?.profile_picture || null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePicture(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpload = async () => {
    if (!profilePicture) return;
    
    const formData = new FormData();
    formData.append('profile_picture', profilePicture);

    try {
      await axios.post(`${BASE_URL}/update-profile-picture`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${user.token}`
        }
      });
      // TODO: Update user context with new profile picture instead of reload
      window.location.reload();
    } catch (error) {
      console.error('Error uploading profile picture:', error);
    }
  };

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
        <div className="profile-picture-upload">
          <input 
            type="file" 
            accept="image/*" 
            onChange={handleFileChange}
          />
          <button onClick={handleUpload}>Actualizar foto</button>
        </div>
        <h2>Mi Perfil</h2>
        <div className="profile-info">
          <p><strong>Email:</strong> {user?.email || 'No disponible'}</p>
          {user?.name && <p><strong>Nombre:</strong> {user.name}</p>}
        </div>
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
