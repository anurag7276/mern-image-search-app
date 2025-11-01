import React from 'react';
import axios from 'axios';

const Navbar = ({ user }) => {
  const serverURL = 'http://localhost:5001';

  const logout = async () => {
    try {
      // We must send credentials to allow the server to clear the session cookie
      await axios.get(`${serverURL}/auth/logout`, { withCredentials: true });
      // Reload the window to clear app state
      window.location.reload();
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px 20px',
      backgroundColor: '#f0f0f0',
      borderBottom: '1px solid #ccc',
    }}>
      <h3>ImageSearch App</h3>
      {user ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <span>{user.displayName}</span>
          {user.profileImageUrl && (
            <img
              src={user.profileImageUrl}
              alt="profile"
              style={{ width: '40px', height: '40px', borderRadius: '50%' }}
            />
          )}
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <span>Please log in.</span>
      )}
    </nav>
  );
};

export default Navbar;