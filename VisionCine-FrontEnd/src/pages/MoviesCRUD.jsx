import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Pencil, Trash2 } from 'lucide-react';
import '../styles/MoviesCRUD.css';

const MoviesCRUD = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const navigate = useNavigate();

  const getAuthToken = () => localStorage.getItem('token');

  const fetchMovies = useCallback(async (pageNumber = 1) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      const response = await axios.get('http://localhost:8000/api/movies', {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: pageNumber, per_page: 10 },
      });
      const data = response.data;
      if (pageNumber === 1) {
        setMovies(data.data);
      } else {
        setMovies((prev) => [...prev, ...data.data]);
      }
      setHasMore(data.current_page < data.last_page);
      setPage(data.current_page);
      setError(null);
    } catch (err) {
      setError('Error fetching movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMovies(1);
  }, [fetchMovies]);

  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const token = getAuthToken();
      await axios.delete(`http://localhost:8000/api/movies/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMovies(1);
      setError(null);
    } catch (error) {
      setError(
        error.response?.data?.message
          ? `Error deleting movie: ${error.response.data.message}`
          : 'Error deleting movie'
      );
      console.error('Delete movie error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/movies/edit/${id}`);
  };

  const handleScroll = useCallback(() => {
    if (loading || !hasMore) return;
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const fullHeight = document.documentElement.offsetHeight;
    if (scrollTop + windowHeight >= fullHeight - 100) {
      fetchMovies(page + 1);
    }
  }, [loading, hasMore, page, fetchMovies]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="container">
      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th className="text-center">Image</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {movies.map((movie, index) => (
              <tr
                key={movie.id}
                className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:shadow-[0_0_8px_#D4AF37] transition-shadow`}
              >
                <td>{movie.title}</td>
                <td className="max-w-lg line-clamp-3">{movie.description}</td>
                <td className="image-container">
                  {movie.poster_path && (
                    <img
                      src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                      alt={movie.title}
                    />
                  )}
                </td>
                <td className="button-container">
                  <button
                    onClick={() => handleEdit(movie.id)}
                    className="button button-edit"
                  >
                    <Pencil size={16} className="icon" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie.id)}
                    className="button button-delete"
                  >
                    <Trash2 size={16} className="icon" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {loading && <p className="loading-text">Loading...</p>}
      {!hasMore && <p className="no-more-text">No more movies to load.</p>}
    </div>
  );
};

export default MoviesCRUD;
