import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../../components/Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* GET /api/officer/applications → [{ applicationId, country }] */
function EmbassyDashboard() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [filtered, setFiltered]         = useState([]);
  const [search, setSearch]             = useState("");
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(true);

  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  useEffect(() => {
    async function fetchApps() {
      try {
        const res = await axios.get(`${BASE}/api/officer/applications`, authHeaders);
        setApplications(res.data);
        setFiltered(res.data);
      } catch {
        setError("Failed to load applications.");
      } finally {
        setLoading(false);
      }
    }
    fetchApps();
  }, []);

  function handleSearch(e) {
    const q = e.target.value.toLowerCase();
    setSearch(e.target.value);
    setFiltered(applications.filter(a =>
      a.applicationId.toLowerCase().includes(q) || a.country?.toLowerCase().includes(q)
    ));
  }

  function badgeClass(s) {
    const map = { Pending: "badge-pending", Approved: "badge-approved", Rejected: "badge-rejected" };
    return `badge ${map[s] || "badge-draft"}`;
  }

  return (
    <div className="page-wrapper">
      <Navbar role="embassy" backPath="/embassy/dashboard" />
      <div className="page-content">
        <h1 className="section-title">Applications Dashboard</h1>
        <p className="section-sub">Manage visa applications assigned to your country.</p>

        {error && <div className="msg-error">{error}</div>}

        {/* Search */}
        <div style={{ marginBottom: 20 }}>
          <input
            placeholder="Search by Application ID or Country…"
            value={search} onChange={handleSearch}
            style={{ padding: "11px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, fontFamily: "var(--font-body)", width: "100%", maxWidth: 380, outline: "none" }}
          />
        </div>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {loading ? (
            <p style={{ padding: 28, color: "var(--text-muted)", fontSize: 14 }}>Loading…</p>
          ) : filtered.length === 0 ? (
            <p style={{ padding: 28, color: "var(--text-muted)", fontSize: 14 }}>No applications found.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(app => (
                  <tr key={app.applicationId}>
                    <td style={{ fontWeight: 500 }}>{app.applicationId}</td>
                    <td>{app.country}</td>
                    <td><span className={badgeClass(app.status)}>{app.status || "Pending"}</span></td>
                    <td>
                      <button className="btn btn-outline" style={{ fontSize: 13, padding: "7px 14px" }}
                        onClick={() => navigate(`/embassy/application/${app.applicationId}`)}>
                        Review →
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default EmbassyDashboard;
