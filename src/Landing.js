import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser, FaUserShield } from "react-icons/fa";

/* FAQ data — Applicant only, per user stories */
const faqData = [
  {
    category: "Applicant FAQs",
    questions: [
      { q: "How do I apply for a new visa?",          a: "Login → Dashboard → Apply New Visa → Fill form → Upload documents → Submit." },
      { q: "Can I continue a partial application?",   a: "Yes. Dashboard → Complete Application → edit and submit." },
      { q: "How do I track my application?",          a: "Dashboard → Track Status → enter your Application ID." },
      { q: "Can I print my application?",             a: "Yes. Use Print Application from the Applicant Dashboard." },
      { q: "What if my documents are rejected?",      a: "Use Re-Upload Documents from the dashboard within the allowed time window." },
    ],
  },
];

function Landing() {
  const navigate = useNavigate();
  const [showFAQ, setShowFAQ] = useState(false);

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-body)", display: "flex", flexDirection: "column" }}>

      {/* Header */}
      <header className="page-header">
        <span className="brand">EVIDMS</span>
        <button className="btn btn-outline" onClick={() => navigate("/admin/login")} style={{ fontSize: 13 }}>
          Admin Login
        </button>
      </header>

      {/* Hero */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 24px" }}>
        <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: 2, textTransform: "uppercase", color: "var(--text-muted)", marginBottom: 12 }}>
          E-Visa & Immigration Document Management
        </p>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 42, textAlign: "center", color: "var(--text-primary)", lineHeight: 1.2, marginBottom: 14, maxWidth: 560 }}>
          Manage your visa application end-to-end
        </h1>
        <p style={{ color: "var(--text-secondary)", fontSize: 15, textAlign: "center", marginBottom: 52, maxWidth: 420 }}>
          Select your role below to login or register and access the appropriate portal.
        </p>

        {/* Role Cards */}
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
          <RoleCard
            icon={<FaUser size={28} />}
            title="Applicant"
            desc="Apply, track, and manage your visa application."
            onClick={() => navigate("/applicant/login")}
          />
          <RoleCard
            icon={<FaUserShield size={28} />}
            title="Embassy Officer"
            desc="Review and process visa applications for your country."
            onClick={() => navigate("/embassy/login")}
          />
        </div>
      </main>

      {/* FAQ Floating Button */}
      <button
        onClick={() => setShowFAQ(true)}
        style={{
          position: "fixed", bottom: 28, right: 28,
          background: "var(--accent)", color: "#fff",
          border: "none", borderRadius: 30, padding: "12px 20px",
          fontSize: 13, fontWeight: 600, cursor: "pointer",
          fontFamily: "var(--font-body)", boxShadow: "var(--shadow-md)",
          transition: "background 0.2s",
        }}
      >
        Help / FAQ
      </button>

      {/* FAQ Sidebar */}
      <div style={{
        position: "fixed", top: 0, right: showFAQ ? 0 : -420,
        width: 380, height: "100%", background: "var(--surface)",
        borderLeft: "1px solid var(--border)", boxShadow: "var(--shadow-lg)",
        padding: 28, overflowY: "auto", transition: "right 0.35s ease", zIndex: 1000,
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <span style={{ fontFamily: "var(--font-display)", fontSize: 20 }}>Help / FAQ</span>
          <button
            onClick={() => setShowFAQ(false)}
            style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", fontSize: 14, fontWeight: 600 }}
          >
            ✕
          </button>
        </div>
        {faqData.map((section, si) => (
          <div key={si}>
            <p style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: "var(--text-muted)", marginBottom: 14 }}>
              {section.category}
            </p>
            {section.questions.map((item, qi) => (
              <div key={qi} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", padding: "14px 16px", marginBottom: 10 }}>
                <p style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{item.q}</p>
                <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{item.a}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* Single role card */
function RoleCard({ icon, title, desc, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "var(--surface)", border: "1px solid var(--border)",
        borderRadius: "var(--radius-lg)", padding: "36px 32px",
        width: 230, cursor: "pointer", textAlign: "center",
        boxShadow: hovered ? "var(--shadow-md)" : "var(--shadow-sm)",
        transform: hovered ? "translateY(-4px)" : "none",
        transition: "all 0.25s ease",
        borderColor: hovered ? "var(--border-strong)" : "var(--border)",
      }}
    >
      <div style={{ marginBottom: 16, color: "var(--text-primary)" }}>{icon}</div>
      <h3 style={{ fontFamily: "var(--font-display)", fontSize: 20, marginBottom: 8 }}>{title}</h3>
      <p style={{ fontSize: 13, color: "var(--text-secondary)", lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

export default Landing;
