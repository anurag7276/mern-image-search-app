import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const serverURL = 'http://localhost:5001';

  useEffect(() => {
    // This function will run when the app loads
    const checkLoginStatus = async () => {
      try {
        // We make a request to our /auth/login/success route
        // withCredentials: true is CRITICAL for sending the session cookie
        const res = await axios.get(`${serverURL}/auth/login/success`, {
          withCredentials: true,
        });

        if (res.data.success) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log('User not logged in', err.message);
      }
      setLoading(false);
    };

    checkLoginStatus();
  }, []); // The empty array [] means this effect runs only once on component mount

  // Show a loading message while we check login status
  if (loading) {
    return <div>Loading...</div>;
  }

  // This is our main app layout
  return (
    <div>
      {/* We only pass the 'user' to the Navbar if they are logged in */}
      <Navbar user={user} />
      {user ? (
        // If user is logged in, show the HomePage
        <HomePage user={user} />
      ) : (
        // If user is not logged in, show the LoginPage
        <LoginPage />
      )}
    </div>
  );
}

export default App;