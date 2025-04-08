import React, { useState } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import MovieList from '../components/MovieList';
import { usePopularMovies } from '../api/moviesApi';

const PopularMovies = ({ onPopularMovieSelect }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]); 
  const { data, isLoading, isError } = usePopularMovies(currentPage);  
  
  const loadMoreMovies = () => {
    if (data && currentPage < data.total_pages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  React.useEffect(() => {
    if (data?.results) {
      setAllMovies(prevMovies => [...prevMovies, ...data.results]);  
    }
  }, [data]);

  if (isLoading && currentPage === 1) {
    return <p>Cargando películas...</p>;
  }

  if (isError) {
    return <p>Error al cargar las películas.</p>;
  }

  return (
    <div>
      <InfiniteScroll
        dataLength={allMovies.length} 
        next={loadMoreMovies}        
        hasMore={currentPage < data?.total_pages}  
        loader={<h4>Cargando más películas...</h4>}
        endMessage={<p>No hay más películas populares.</p>}
      >
        <MovieList movies={allMovies} onMovieSelect={onPopularMovieSelect} title="Películas Populares" />
      </InfiniteScroll>
    </div>
  );
};

export default PopularMovies;
