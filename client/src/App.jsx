import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import Navbar from './components/Navbar';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

 const serverURL = import.meta.env.VITE_SERVER_URL;

  useEffect(() => {
    
    const checkLoginStatus = async () => {
      try {
     
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

  
  if (loading) {
    return <div>Loading...</div>;
  }

  // This is our main app layout
  return (
    <div>
     
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