import React, { useState } from 'react';
import axios from 'axios';

// We pass 'onSearch' as a prop, which is a function from HomePage
const SearchComponent = ({ onSearch }) => {
  const [term, setTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const serverURL = 'http://localhost:5001';

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!term) return;

    setLoading(true);
    setError(null);

    try {
      // Call our server's /api/search endpoint, sending the session cookie
      const res = await axios.post(
        `${serverURL}/api/search`,
        { term: term },
        { withCredentials: true }
      );

      // Call the function from HomePage, passing the results and term up
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