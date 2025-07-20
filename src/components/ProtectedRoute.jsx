// src/components/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center p-6">Loading...</div>;

  if (!user) return <Navigate to="/login" />;
  if (!user.emailVerified) return <Navigate to="/verify-email" />;

  return children;
}