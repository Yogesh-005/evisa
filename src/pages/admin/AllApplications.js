import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* GET /api/admin/applications             → all applications
   GET /api/admin/applications?country=USA → filtered */
function AllApplications() {
  const [applications, setApplications] = useState([]);
  const [country, setCountry]           = useState("");
  const [search, setSearch]             = useState("");
  const [error, setError]               = useState("");
  const [loading, setLoading]           = useState(false);

  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  async function fetchApplications(countryFilter = "") {
    setError(""); setLoading(true);
    try {
      const url = countryFilter
        ? `${BASE}/api/admin/applications?country=${countryFilter}`
        : `${BASE}/api/admin/applications`;
      const res = await axios.get(url, authHeaders);
      setApplications(res.data);
    } catch {
      setError("Failed to load applications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { fetchApplications(); }, []);

  function handleFilter(e) {
    e.preventDefault();
    fetchApplications(country.trim());
  }

  function badgeClass(s) {
    const map = { Pending: "badge-pending", Approved: "badge-approved", Rejected: "badge-rejected" };
    return `badge ${map[s] || "badge-draft"}`;
  }

  const displayed = applications.filter(a =>
    !search || a.applicationId.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="page-wrapper">
      <Navbar role="admin" backPath="/admin/dashboard" />
      <div className="page-content">
        <h1 className="section-title">All Applications</h1>
        <p className="section-sub">View and filter visa applications across all countries.</p>

        {error && <div className="msg-error">{error}</div>}

        {/* Filter row */}
        <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
          <form onSubmit={handleFilter} style={{ display: "flex", gap: 10 }}>
            <input
              placeholder="Filter by country…"
              value={country} onChange={e => setCountry(e.target.value)}
              style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, fontFamily: "var(--font-body)", outline: "none", width: 200 }}
            />
            <button className="btn btn-primary" type="submit">Filter</button>
            {country && (
              <button className="btn btn-outline" type="button" onClick={() => { setCountry(""); fetchApplications(); }}>Clear</button>
            )}
          </form>
          <input
            placeholder="Search by Application ID…"
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "var(--radius-sm)", fontSize: 14, fontFamily: "var(--font-body)", outline: "none", width: 240 }}
          />
        </div>

        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {loading ? (
            <p style={{ padding: 28, color: "var(--text-muted)", fontSize: 14 }}>Loading…</p>
          ) : displayed.length === 0 ? (
            <p style={{ padding: 28, color: "var(--text-muted)", fontSize: 14 }}>No applications found.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Application ID</th>
                  <th>Country</th>
                  <th>Visa Type</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {displayed.map(app => (
                  <tr key={app.applicationId}>
                    <td style={{ fontWeight: 500 }}>{app.applicationId}</td>
                    <td>{app.country || "—"}</td>
                    <td>{app.visaType || "—"}</td>
                    <td><span className={badgeClass(app.status)}>{app.status}</span></td>
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

export default AllApplications;
