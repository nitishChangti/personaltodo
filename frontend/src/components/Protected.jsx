// src/components/Protected.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function Protected({ children, authentication = true, role }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>;

  // Not logged in
  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Already logged in (trying to access login/register)
  if (!authentication && isAuthenticated) {
    if (user?.role === "admin") {
      console.log('admin');
      return <Navigate to="/admin-dashboard" replace />; // ✅ correct
    }
    return <Navigate to="/dashboard" replace />;
  }

  // Role-based protection for admin route
  if (role && user?.role !== role) {
    return <Navigate to="/admin-dashboard" replace />; // ✅ non-admin goes to dashboard
  }

  return children;
}