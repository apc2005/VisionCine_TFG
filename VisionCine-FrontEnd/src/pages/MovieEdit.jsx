import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const MovieEdit = () => {
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
      try {
        const token = getAuthToken();
        const response = await axios.get(`http://localhost:8000/api/movies/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setForm({
          title: response.data.title || '',
          description: response.data.description || '',
          release_date: response.data.release_date || '',
          poster_path: response.data.poster_path || '',
          genre: response.data.genre || '',
        });
      } catch {
        setError('Error fetching movie data');
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getAuthToken();
      await axios.put(`http://localhost:8000/api/movies/${id}`, form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/movies');
    } catch {
      setError('Error updating movie');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Edit Movie</h1>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="description" placeholder="Description" value={form.description} onChange={handleChange} />
        <input name="release_date" type="date" placeholder="Release Date" value={form.release_date} onChange={handleChange} />
        <input name="poster_path" placeholder="Poster Path" value={form.poster_path} onChange={handleChange} />
        <input name="genre" placeholder="Genre" value={form.genre} onChange={handleChange} />
        <button type="submit">Update Movie</button>
        <button type="button" onClick={() => navigate('/movies')} style={{ marginLeft: '10px' }}>Cancel</button>
      </form>
    </div>
  );
};

export default MovieEdit;
