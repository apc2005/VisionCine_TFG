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
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('token');

  useEffect(() => {
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
        });
      } catch (err) {
        console.error(err);
        setError('Error fetching user data');
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
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
      // Only send password if it is not empty
      const dataToSend = { ...form };
      if (!dataToSend.password) {
        delete dataToSend.password;
      }
      await axios.put(`http://localhost:8000/api/users/${id}`, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/users-crud', { replace: true });
    } catch (err) {
      console.error('Update user error:', err);
      const message =
        err.response?.data?.message || 'Error updating user';
      setError(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Edit User</h1>

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-text">Loading...</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Name"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">Password (leave blank to keep current)</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.password}
              onChange={handleChange}
              placeholder="Password"
              className="form-input"
            />
          </div>

          <div className="button-group">
            <button
              type="submit"
              className="btn btn-update"
              disabled={loading}
            >
              Update User
            </button>
            <button
              type="button"
              onClick={() => navigate('/users-crud')}
              className="btn btn-cancel"
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default UserEdit;
