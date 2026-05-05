import React from "react";
import { useNavigate } from "react-router-dom";

/* Shared top navigation bar for all authenticated pages */
function Navbar({ role, backPath }) {
  const navigate = useNavigate();

  const roleLabel = {
    applicant: "Applicant Portal",
    embassy:   "Embassy Officer Portal",
    admin:     "Admin Portal",
  }[role] || "EVIDMS";

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  }

  return (
    <header className="page-header">
      <span
        className="brand"
        style={{ cursor: "pointer" }}
        onClick={() => navigate(backPath || "/")}
      >
        EVIDMS — {roleLabel}
      </span>
      <button className="btn btn-outline" style={{ fontSize: 13 }} onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
}

export default Navbar;
