import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutPage = () => {
  const [logoutSuccess, setLogoutSuccess] = useState(false);
  const history = useNavigate();

  useEffect(() => {
    const logout = async () => {
      try {
        const response = await axios.post('http://localhost:4000/api/v1/admin/logout');
        if (response.status === 200) {
          // Clear session storage
          sessionStorage.clear();
          sessionStorage.removeItem('userId');
          sessionStorage.removeItem('username');
          sessionStorage.removeItem('token');
          sessionStorage.removeItem('isLoggedIn');

          setLogoutSuccess(true);
          // Redirect to the login page after successful logout
          history("/login");
        } else {
          console.error('Logout failed:', response.statusText);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    };

    logout();
  }, [history]);

  return (
    <div>
      {logoutSuccess ? (
        <div>
          <h2>Logout Successful</h2>
          <p>You have been logged out successfully.</p>
        </div>
      ) : (
        <div>
          <h2>Logging Out...</h2>
          <p>Please wait while we log you out.</p>
        </div>
      )}
    </div>
  );
};

export default LogoutPage;
