import React, { createContext, useContext, useState, useEffect } from "react";
import axios from 'axios';

const AuthContext = createContext();

// Helper function for consistent logging
const logAuth = (action, data = null, error = null) => {
  const timestamp = new Date().toISOString();
  console.group(`🔐 Auth Action: ${action} - ${timestamp}`);
  if (data) console.log('📦 Data:', data);
  if (error) console.error('❌ Error:', error);
  console.groupEnd();
};

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Set up axios defaults on mount (retrieve token from localStorage)
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      logAuth('Setting Axios Default Headers', { token: `${token.substr(0, 10)}...` });
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Check for existing authentication on load
  useEffect(() => {
    const checkAuth = async () => {
      logAuth('Checking Initial Authentication');
      try {
        const token = localStorage.getItem('token');
        const userData = localStorage.getItem('user');

        if (token && userData) {
          logAuth('Found Stored Authentication', {
            token: `${token.substr(0, 10)}...`,
            user: JSON.parse(userData),
          });

          if (!isTokenExpired(token)) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setCurrentUser(JSON.parse(userData));
          } else {
            logAuth('Token Expired', { token: `${token.substr(0, 10)}...` });
            localStorage.removeItem('token');
            localStorage.removeItem('user');
          }
        } else {
          logAuth('No Stored Authentication Found');
        }
      } catch (err) {
        logAuth('Error Checking Authentication', null, err);
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setLoading(false);
        logAuth('Initial Authentication Check Complete', { loading: false });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (email, token, user) => {
    logAuth('Login Attempt', { email, token: `${token.substr(0, 10)}...`, user });

    try {
      // Store authentication data
      // localStorage.setItem('token', token);
      const userData = {email, id : token, user}
      localStorage.setItem('user', JSON.stringify(userData));

      // Set axios default header
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      // Update state
      setCurrentUser(userData);
      console.log('user data in logAuth', userData)
      setError(null);

      //logAuth('Login Successful', { userData });
    } catch (err) {
      logAuth('Login Error', null, err);
      setError(err.message);
      throw err;
    }
  };

  // Registration function
  const register = async (username, email, password) => {
    logAuth('Registration Attempt', { username, email });

    try {
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        email,
        password
      });

      logAuth('Registration Successful', response.data);
      setError(null);
      return response.data;
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Registration failed';
      logAuth('Registration Error', null, { message: errorMessage, error: err });
      setError(errorMessage);
      throw err;
    }
  };

  // Logout function
  const logout = async () => {
    logAuth('Logout Attempt');

    try {
      // Call logout endpoint if needed
      await axios.post('http://localhost:5000/api/logout');
      logAuth('Logout API Call Successful');
    } catch (err) {
      logAuth('Logout API Error', null, err);
    } finally {
      // Clear authentication data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      delete axios.defaults.headers.common['Authorization'];
      setCurrentUser(null);
      setError(null);
      logAuth('Logout Complete - Local State Cleared');
    }
  };

  // Helper function to check if token is expired
  const isTokenExpired = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expiry = payload.exp * 1000; // Convert to milliseconds
      logAuth('Token Expiry Check', {
        expiryDate: new Date(expiry).toISOString(),
        isExpired: Date.now() >= expiry,
      });
      return Date.now() >= expiry;
    } catch (err) {
      logAuth('Token Expiry Check Error', null, err);
      return true;
    }
  };

  // Function to get current auth status
  const getAuthStatus = () => {
    const token = localStorage.getItem('token');
    const status = {
      isAuthenticated: !!currentUser,
      hasToken: !!token,
      tokenExpired: token ? isTokenExpired(token) : null,
      user: currentUser,
    };
    logAuth('Auth Status Check', status);
    return status;
  };

  // Provide auth context value
  const value = {
    currentUser,
    login,
    logout,
    register,
    error,
    setError,
    isAuthenticated: !!currentUser,
    getAuthStatus,
  };

  // Render children only when not loading
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
