import React from "react";
import { Navigate, useLocation } from "react-router-dom";

/**
 * Route wrapper that redirects unauthenticated users to a login page.
 * Usage: <Route path="/dashboard" element={<RequireAuth role="applicant"><Dashboard /></RequireAuth>} />
 */
function RequireAuth({ role = "applicant", children }) {
  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) {
    const loginPath = role === "applicant" ? "/applicant/login"
                    : role === "embassy"   ? "/embassy/login"
                    : "/admin/login";
    return <Navigate to={loginPath} state={{ from: location }} replace />;
  }

  // Optional role check — allow any role if `role` not specified strictly.
  if (role && userRole && userRole !== role) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default RequireAuth;
