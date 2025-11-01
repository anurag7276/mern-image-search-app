import React from 'react';

const UserHistory = ({ history }) => {
  if (!history || history.length === 0) {
    return <p>You have no search history yet.</p>;
  }

  return (
    <div style={{
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
      backgroundColor: '#f9f9f9',
    }}>
      <h4>Your Recent Searches:</h4>
      <ul style={{ listStyleType: 'none', paddingLeft: 0, margin: 0 }}>
        {history.map((item, index) => (
          <li key={index} style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '5px 0',
            borderBottom: '1px solid #eee',
          }}>
            <span>{item.term}</span>
            <span style={{ fontSize: '0.8em', color: '#666' }}>
              {new Date(item.timestamp).toLocaleString()}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserHistory;