import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useSelector((state) => state.auth);

  if (!user) return <Navigate to="/login" replace />;
  if (!allowedRoles.includes(user.user_type)) return <Navigate to="/" replace />;

  return children;
};

export default RoleProtectedRoute;
