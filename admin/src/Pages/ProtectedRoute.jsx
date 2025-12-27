// ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  // Replace this with your actual authentication check.
  // For example, you may check for a token in localStorage:
  const isAuthenticated = localStorage.getItem('user') !== null;
  
  // If not authenticated, redirect to login page
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
