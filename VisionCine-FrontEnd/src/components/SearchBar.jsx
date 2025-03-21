import React, { useState } from 'react';

const SearchBar = ({ onSearch, fetchPopularMovies }) => {
  const [input, setInput] = useState('');
  const [timeoutId, setTimeoutId] = useState(null); 

  const handleInputChange = (event) => {
    const query = event.target.value;
    setInput(query);


    if (query.trim() === '') {
      fetchPopularMovies();
    } else {


    if (timeoutId) {
        clearTimeout(timeoutId);
      }

      const newTimeoutId = setTimeout(() => {
        onSearch(query);
      }, 500); 

      setTimeoutId(newTimeoutId);
    }
  };

  return (
    <form className="search-bar">
      <input
        type="text"
        placeholder="Buscar películas..."
        value={input}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;