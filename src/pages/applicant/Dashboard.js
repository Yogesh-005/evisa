import React from "react";
import { useNavigate } from "react-router-dom";
import { FaFileAlt, FaClipboardList, FaSearch, FaPrint, FaUpload } from "react-icons/fa";
import Navbar from "../../components/Navbar";

const cards = [
  { icon: <FaFileAlt size={26} />,      title: "Apply New Visa",        path: "/apply-new-visa" },
  { icon: <FaClipboardList size={26} />, title: "Complete Application",  path: "/complete-application" },
  { icon: <FaSearch size={26} />,       title: "Track Status",          path: "/track-status" },
  { icon: <FaPrint size={26} />,        title: "Print Application",     path: "/print-application" },
  { icon: <FaUpload size={26} />,       title: "Re-Upload Document",    path: "/reupload-document" },
];

const steps = [
  "Apply for a new visa application.",
  "Complete a partially filled application.",
  "Track your application status.",
  "Print your submitted application.",
  "Re-upload rejected or missing documents.",
];

function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />

      <div className="page-content" style={{ maxWidth: 900 }}>
        <h1 className="section-title">Applicant Dashboard</h1>
        <p className="section-sub">Manage every step of your visa application from here.</p>

        {/* Instructions */}
        <div className="card" style={{ marginBottom: 36 }}>
          <p style={{ fontWeight: 600, marginBottom: 14, fontSize: 15 }}>How to use this portal</p>
          <ol style={{ paddingLeft: 20, display: "flex", flexDirection: "column", gap: 8 }}>
            {steps.map((s, i) => (
              <li key={i} style={{ color: "var(--text-secondary)", fontSize: 14, lineHeight: 1.5 }}>{s}</li>
            ))}
          </ol>
        </div>

        {/* Navigation Cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "flex-start" }}>
          {cards.map((c, i) => (
            <DashboardCard key={i} icon={c.icon} title={c.title} onClick={() => navigate(c.path)} />
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ icon, title, onClick }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        width: 168, minHeight: 160,
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-md)", cursor: "pointer",
        display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 14,
        padding: "24px 16px",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.22s ease",
        borderColor: hovered ? "var(--border-strong)" : "var(--border)",
      }}
    >
      <div style={{ color: "var(--text-primary)" }}>{icon}</div>
      <p style={{ fontWeight: 600, fontSize: 13, textAlign: "center", lineHeight: 1.4 }}>{title}</p>
    </div>
  );
}

export default Dashboard;
