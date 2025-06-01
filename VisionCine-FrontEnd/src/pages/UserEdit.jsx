import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MoviesEdit.css';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role_id: '',
  });
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('token');

  const fetchRoles = async () => {
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8000/api/roles', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRoles(response.data);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  useEffect(() => {
    if (id) {
      const fetchUser = async () => {
        setLoading(true);
        setError(null);
        try {
          const token = getAuthToken();
          const response = await axios.get(`http://localhost:8000/api/users/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          const user = response.data || {};
          setForm({
            name: user.name || '',
            email: user.email || '',
            password: '',
            role_id: user.role_id || '',
          });
        } catch (err) {
          console.error(err);
          setError('Error al obtener datos del usuario');
        } finally {
          setLoading(false);
        }
      };
      fetchUser();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const token = getAuthToken();
      if (id) {
        const dataToSend = { ...form };
        if (!dataToSend.password) {
          delete dataToSend.password;
        }
        await axios.put(`http://localhost:8000/api/users/${id}`, dataToSend, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:8000/api/users', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/users-crud', { replace: true });
    } catch (err) {
      console.error('Save user error:', err);
      const message =
        err.response?.data?.message || (id ? 'Error al actualizar el usuario' : 'Error al crear el usuario');
      setError(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">{id ? 'Editar usuario' : 'Crear usuario'}</h1>

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-text">Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Nombre</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Nombre"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Correo electrónico</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Correo electrónico"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Contraseña (dejar en blanco para mantener la actual)</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Contraseña"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="role_id" className="form-label">Rol</label>
            <select
              id="role_id"
              name="role_id"
              value={form.role_id}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">Usuario</option>
              {roles.map((role) => (
                <option key={role.id} value={role.id}>
                  {role.name}
                </option>
              ))}
            </select>
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="btn btn-update"
              disabled={loading}
            >
              {id ? 'Actualizar usuario' : 'Crear usuario'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/users-crud')}
              className="btn btn-cancel"
              disabled={loading}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserEdit;
