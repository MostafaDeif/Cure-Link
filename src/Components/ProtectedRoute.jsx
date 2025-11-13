import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ user, children, requiredRole }) => {
  // If user not passed as prop, try to read from localStorage
  let currentUser = user;
  if (!currentUser) {
    try {
      const stored = localStorage.getItem("user");
      currentUser = stored ? JSON.parse(stored) : null;
    } catch (e) {
      currentUser = null;
    }
  }

  // Not authenticated -> send to login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // Role-based protection (optional)
  if (requiredRole && currentUser.role && currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
