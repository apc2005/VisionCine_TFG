import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import '../styles/MoviesCrud.css'; 

const UsersCRUD = () => {
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

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

  const fetchUsers = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8000/api/users', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: pageNumber, per_page: 10 },
      });
      const data = response.data;
      if (pageNumber === 1) {
        setUsers(data.data);
      } else {
        setUsers((prev) => [...prev, ...data.data]);
      }
      setHasMore(data.current_page < data.last_page);
      setPage(data.current_page);
      setError(null);
    } catch (err) {
      setError('Error al obtener usuarios');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(1);
    fetchRoles();
  }, [fetchUsers]);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchUsers(1);
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message
          ? `Error al eliminar el usuario: ${error.response.data.message}`
          : 'Error al eliminar el usuario'
      );
      console.error('Delete user error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/users/edit/${id}`);
  };

  const handleCreate = () => {
    navigate('/users/edit');
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.offsetHeight;
    if (scrollTop + windowHeight >= fullHeight - 100) {
      fetchUsers(page + 1);
    }
  }, [loading, hasMore, page, fetchUsers]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}

      <button className="button button-create" onClick={handleCreate}>
        Crear Usuario
      </button>

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Correo electrónico</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr
                key={user.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:shadow-[0_0_8px_#D4AF37] transition-shadow`}
              >
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td className="button-container">
                  <button
                    onClick={() => handleEdit(user.id)}
                    className="button button-edit"
                  >
                    <Pencil size={16} className="icon" />
                    Editar
                  </button>
                  <button
                    onClick={() => handleDelete(user.id)}
                    className="button button-delete"
                  >
                    <Trash2 size={16} className="icon" />
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && <p className="loading-text">Cargando...</p>}
      {!hasMore && <p className="no-more-text">No hay más usuarios para cargar.</p>}
    </div>
  );
};

export default UsersCRUD;
