import React, { useState } from 'react';
import axios from 'axios';


const SearchComponent = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

 const serverURL = import.meta.env.VITE_SERVER_URL;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!term) return;

    setLoading(true);
    setError(null);

    try {
      
      const res = await axios.post(
        `${serverURL}/api/search`,
        { term: term },
        { withCredentials: true }
      );

      
      onSearch(res.data.images, term);
    } catch (err) {
      console.error('Search failed', err);
      setError(err.response?.data?.message || 'Search failed');
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: '20px' }}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={term}
          onChange={(e) => setTerm(e.target.value)}
          placeholder="Search for images..."
          style={{ padding: '10px', width: '300px' }}
        />
        <button type="submit" disabled={loading} style={{ padding: '10px' }}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default SearchComponent;