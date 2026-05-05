import React from "react";
import { useNavigate } from "react-router-dom";
import { FaClipboardList, FaBuilding } from "react-icons/fa";
import Navbar from "./Navbar";

const sections = [
  { icon: <FaClipboardList size={26} />, title: "All Applications", desc: "View and filter all visa applications.", path: "/admin/applications" },
  { icon: <FaBuilding size={26} />,      title: "Embassy Management", desc: "Add, update, or remove embassies.",      path: "/admin/embassies"    },
];

function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar role="admin" backPath="/admin/dashboard" />
      <div className="page-content" style={{ maxWidth: 700 }}>
        <h1 className="section-title">Admin Dashboard</h1>
        <p className="section-sub">Manage visa applications and embassy records system-wide.</p>

        <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
          {sections.map((s, i) => (
            <AdminCard key={i} {...s} onClick={() => navigate(s.path)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminCard({ icon, title, desc, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)", padding: "32px 28px",
        width: 240, cursor: "pointer",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.22s ease",
        borderColor: hovered ? "var(--border-strong)" : "var(--border)",
      }}
    >
      <div style={{ marginBottom: 14, color: "var(--text-primary)" }}>{icon}</div>
      <p style={{ fontWeight: 600, fontSize: 15, marginBottom: 6 }}>{title}</p>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

export default AdminDashboard;
