import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import '../styles/MoviesEdit.css'; 

const genreOptions = [
  '',
  'Acción',
  'Aventura',
  'Comedia',
  'Drama',
  'Terror',
  'Ciencia ficción',
  'Romance',
  'Suspense',
  'Animación',
  'Documental',
];

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
    if (id) {
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
          setError('Error al obtener datos de la película');
        } finally {
          setLoading(false);
        }
      };
      fetchMovie();
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
        await axios.put(`http://localhost:8000/api/movies/${id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post('http://localhost:8000/api/movies', form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      navigate('/movies-crud', { replace: true });
    } catch (err) {
      console.error('Save movie error:', err);
      const message =
        err.response?.data?.message || (id ? 'Error al actualizar la película' : 'Error al crear la película');
      setError(`Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container movie-edit-container">
      <h1 className="heading">{id ? 'Editar película' : 'Crear película'}</h1>

      {error && <p className="error-message">{error}</p>}
      {loading ? (
        <p className="loading-text">Cargando...</p>
      ) : (
        <form onSubmit={handleSubmit} className="movie-edit-form">
          <div className="form-group">
            <label htmlFor="title" className="form-label">Título</label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Título"
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description" className="form-label">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Descripción"
              rows={4}
              className="form-textarea"
            />
          </div>

          <div className="form-group">
            <label htmlFor="release_date" className="form-label">Fecha de estreno</label>
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
            <label htmlFor="poster_path" className="form-label">Ruta del póster</label>
            <input
              id="poster_path"
              name="poster_path"
              value={form.poster_path}
              onChange={handleChange}
              placeholder="Ruta del póster"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="genre" className="form-label">Género</label>
            <select
              id="genre"
              name="genre"
              value={form.genre}
              onChange={handleChange}
              className="form-select"
            >
              {genreOptions.map((genreOption) => (
                <option key={genreOption} value={genreOption}>
                  {genreOption}
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
              {id ? 'Actualizar película' : 'Crear película'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/movies-crud')}
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

export default MoviesEdit;
