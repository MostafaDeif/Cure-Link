import { Navigate } from "react-router-dom";

const parseJwt = (token) => {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

const ProtectedRoute = ({ children, requiredRole }) => {
  let currentUser = null;

  // 1) حاول تقرأ التوكن
  const token = localStorage.getItem("token");
  if (token) {
    const payload = parseJwt(token);

    if (payload) {
      currentUser = {
        id: payload.id || payload.sub,
        email: payload.email,
        name:
          payload.name ||
          payload.username ||
          payload.fullName ||
          payload.email,
        role:
          payload.role ||
          (Array.isArray(payload.roles) ? payload.roles[0] : payload.roles) ||
          "customer",
      };

      localStorage.setItem("user", JSON.stringify(currentUser));
    }
  }

  // 2) ولو مفيش توكن، حاول تقرأ user
  if (!currentUser) {
    try {
      const userFromStorage = localStorage.getItem("user");
      currentUser = userFromStorage ? JSON.parse(userFromStorage) : null;
    } catch {
      currentUser = null;
    }
  }

  // 3) لو مش مسجل → روح Login
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }

  // 4) لو فيه role مطلوب
  if (requiredRole && currentUser.role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
