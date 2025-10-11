import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ children, role }) {
  const { user, loading } = useAuth();

  if (loading) return <div className="text-center mt-10">Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (user.role === "admin") return children;

  if (role && user.role !== role) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
