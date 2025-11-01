import React from 'react';

const LoginPage = () => {
  // We will link directly to our server's auth routes
  const serverURL = 'http://localhost:5001';

  const googleLogin = () => {
    window.open(`${serverURL}/auth/google`, '_self');
  };

  const githubLogin = () => {
    window.open(`${serverURL}/auth/github`, '_self');
  };

  const facebookLogin = () => {
    window.open(`${serverURL}/auth/facebook`, '_self');
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h2>Login to Continue</h2>
      <p>Please select a provider to log in:</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px', margin: 'auto' }}>
        <button onClick={googleLogin} style={{ backgroundColor: '#DB4437', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
          Login with Google
        </button>
        <button onClick={githubLogin} style={{ backgroundColor: '#333', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
          Login with GitHub
        </button>
        <button onClick={facebookLogin} style={{ backgroundColor: '#4267B2', color: 'white', padding: '10px', border: 'none', cursor: 'pointer' }}>
          Login with Facebook
        </button>
      </div>
    </div>
  );
};

export default LoginPage;