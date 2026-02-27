// src/components/Protected.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function AdminProtected({ children, authentication = true, role }) {
  const { isAuthenticated, loading, user } = useSelector((state) => state.auth);

  if (loading) return <div className="p-6">Loading...</div>;

  if (authentication && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!authentication && isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
    console.log(role,user.role);
  // 🔐 Role-based protection (Admin only)
  if (role && user?.role !== role) {
    console.log('admin');
    return <Navigate to="/admin-dashboard" replace />;
  }

  return children;
}