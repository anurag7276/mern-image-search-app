import React from 'react';

const TopSearches = ({ topSearches }) => {
  if (!topSearches || topSearches.length === 0) {
    return null; // Don't render anything if there are no top searches
  }

  return (
    <div style={{
      padding: '10px 20px',
      backgroundColor: '#e6f7ff',
      border: '1px solid #b3e0ff',
      borderRadius: '5px',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
    }}>
      <strong>Top Searches:</strong>
      {topSearches.map((item, index) => (
        <span key={index} style={{
          backgroundColor: '#007bff',
          color: 'white',
          padding: '2px 8px',
          borderRadius: '12px',
          fontSize: '0.9em',
        }}>
          {item.term}
        </span>
      ))}
    </div>
  );
};

export default TopSearches;