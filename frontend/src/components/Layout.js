import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext'; // Assuming you have AuthContext
import Navbar from './Navbar';
import FooterComp from "./FooterComp"

function Layout() {
  const navigate = useNavigate();
  const { login } = useAuth(); // Retrieve the login function from context

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (accessToken) {
      // Simulate an auto-login by calling the login function from AuthContext
      login(null, accessToken, null); // Assuming login uses email, token, and user data
      navigate('/dashboard'); // Redirect to dashboard if token exists
    }
  }, [navigate, login]); // Dependencies

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        {/* Outlet will render the child components */}
        <Outlet />
      </main>
      <FooterComp />
    </div>
  );
}

export default Layout;
