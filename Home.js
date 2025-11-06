import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleError, handleSuccess } from '../utils';
import { ToastContainer } from 'react-toastify';

// Import SlotSwapper dashboard components
import Calendar from '../components/Calendar';
import Marketplace from '../components/Marketplace';
import SwapRequests from '../components/SwapRequests';

function Home() {
  const [loggedInUser, setLoggedInUser] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('loggedInUser'));
  }, []);

  const handleLogout = (e) => {
    localStorage.removeItem('token');
    localStorage.removeItem('loggedInUser');
    handleSuccess('User Logged out');
    setTimeout(() => {
      navigate('/login');
    }, 1000);
  };

  return (
    <div>
      <h1>Welcome {loggedInUser}</h1>
      <button onClick={handleLogout}>Logout</button>

      <hr /> {/* Optional separation */}

      {/* SlotSwapper sections */}
      <Calendar />
      <Marketplace />
      <SwapRequests />

      <ToastContainer />
    </div>
  );
}

export default Home;
