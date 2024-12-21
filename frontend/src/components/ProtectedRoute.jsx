// src/components/ProtectedRoute.jsx

import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const token = localStorage.getItem("token");

  // Si pas de token, on redirige vers /login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Sinon, on affiche la page demandée
  return children;
}

export default ProtectedRoute;
