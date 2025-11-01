import React from 'react';

const MultiSelectCounter = ({ count, lastSearchTerm, totalResults }) => {
  return (
    <div style={{ padding: '10px 20px' }}>
      {lastSearchTerm && (
        <h3>
          You searched for "{lastSearchTerm}" — {totalResults} results. [cite: 24]
        </h3>
      )}
      <h4 style={{ margin: 0 }}>
        Selected: {count} images 
      </h4>
    </div>
  );
};

export default MultiSelectCounter;