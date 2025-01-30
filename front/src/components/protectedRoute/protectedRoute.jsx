import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector(state => state.isAuthenticated);

  if (!isAuthenticated && !localStorage.getItem('token')) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;
