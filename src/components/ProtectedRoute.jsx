 import React from 'react';
import { useFirebase } from "../context/Firebase";
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children, allowedRoles }) {
  const { role, isLoggedIn } = useFirebase();

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;
