import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  // Show loading state while checking user
  if (loading) return <div className="text-center mt-10">Loading...</div>;

  // If no user, send back to login
  if (!user) return <Navigate to="/login" replace />;

  // Special case: admin has full access
  if (user.role === "admin") return children;

  // If a specific role is required and user doesn't match → block
  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Otherwise allow access
  return children;
}
