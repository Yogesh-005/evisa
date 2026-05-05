import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* POST /api/auth/officer/login → { token, role:"OFFICER" } */
function EmbassyLogin() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ embassyId: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    if (!form.embassyId || !form.password) return setError("All fields are required.");
    try {
      setLoading(true);
      const res = await axios.post(`${BASE}/api/auth/officer/login`, form);
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/embassy/dashboard");
    } catch {
      setError("Invalid Embassy ID or password.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>Embassy Officer Login</p>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 6 }}>
            Sign in with your embassy credentials.
          </p>
        </div>
        <div className="card">
          {error && <div className="msg-error">{error}</div>}
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Embassy ID</label>
              <input placeholder="e.g. EMB101" value={form.embassyId}
                onChange={e => setForm({ ...form, embassyId: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" placeholder="Enter password" value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })} />
            </div>
            <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
              {loading ? "Logging in…" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmbassyLogin;
