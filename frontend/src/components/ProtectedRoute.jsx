import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  // Check for token existence in local storage.
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" state={{initialError: "You need to log in to access this route."}} replace />;
  }
  // Once user is logged in, allow access to routes.
  return <Outlet />;
};

export default ProtectedRoute;
