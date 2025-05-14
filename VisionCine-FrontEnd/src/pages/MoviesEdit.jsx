import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MoviesEdit.css'; 

const MoviesEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    release_date: '',
    poster_path: '',
    genre: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAuthToken = () => localStorage.getItem('token');

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getAuthToken();
        const response = await axios.get(`http://localhost:8000/api/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const movie = response.data || {};
        setForm({
          title: movie.title || '',
          description: movie.description || '',
          release_date: movie.release_date || '',
          poster_path: movie.poster_path || '',
          genre: movie.genre || '',
        });
      } catch (err) {
        console.error(err);
        setError('Error fetching movie data');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
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
      await axios.put(`http://localhost:8000/api/movies/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/movies-crud', { replace: true });
    } catch (err) {
      console.error('Update movie error:', err);
      const message =
        err.response?.data?.message || 'Error updating movie';
      setError(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
  <h1 className="heading">Edit Movie</h1>

  {error && <p className="error-message">{error}</p>}
  {loading ? (
    <p className="loading-text">Loading...</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="title" className="form-label">Title</label>
        <input
          id="title"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          rows={4}
          className="form-textarea"
        />
      </div>

      <div className="form-group">
        <label htmlFor="release_date" className="form-label">Release Date</label>
        <input
          id="release_date"
          name="release_date"
          type="date"
          value={form.release_date}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="poster_path" className="form-label">Poster Path</label>
        <input
          id="poster_path"
          name="poster_path"
          value={form.poster_path}
          onChange={handleChange}
          placeholder="Poster Path"
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label htmlFor="genre" className="form-label">Genre</label>
        <input
          id="genre"
          name="genre"
          value={form.genre}
          onChange={handleChange}
          placeholder="Genre"
          className="form-input"
        />
      </div>

      <div className="button-group">
        <button
          type="submit"
          className="btn btn-update"
          disabled={loading}
        >
          Update Movie
        </button>
        <button
          type="button"
          onClick={() => navigate('/movies-crud')}
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

export default MoviesEdit;