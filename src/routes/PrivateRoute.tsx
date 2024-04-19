import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <>{children}</> : <Navigate to="/login" replace />;
};

export default PrivateRoute;