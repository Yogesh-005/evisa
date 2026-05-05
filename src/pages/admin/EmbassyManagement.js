import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* GET    /api/admin/embassies       → list
   POST   /api/admin/embassies       → add
   PUT    /api/admin/embassies/:id   → update
   DELETE /api/admin/embassies/:id   → delete */
function EmbassyManagement() {
  const [embassies, setEmbassies] = useState([]);
  const [form, setForm]           = useState({ name: "", country: "" });
  const [editId, setEditId]       = useState(null);    // null = add mode
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [error, setError]         = useState("");
  const [success, setSuccess]     = useState("");
  const [loading, setLoading]     = useState(false);
  const [showForm, setShowForm]   = useState(false);

  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  async function fetchEmbassies() {
    try {
      const res = await axios.get(`${BASE}/api/admin/embassies`, authHeaders);
      setEmbassies(res.data);
    } catch {
      setError("Failed to load embassies.");
    }
  }

  useEffect(() => { fetchEmbassies(); }, []);

  function openAdd() {
    setForm({ name: "", country: "" }); setEditId(null); setShowForm(true); setError(""); setSuccess("");
  }

  function openEdit(emb) {
    setForm({ name: emb.name, country: emb.country }); setEditId(emb._id || emb.id); setShowForm(true); setError(""); setSuccess("");
  }

  async function handleSave(e) {
    e.preventDefault();
    setError(""); setSuccess("");
    if (!form.name || !form.country) return setError("Embassy name and country are required.");
    try {
      setLoading(true);
      if (editId) {
        await axios.put(`${BASE}/api/admin/embassies/${editId}`, form, authHeaders);
        setSuccess("Embassy updated successfully.");
      } else {
        await axios.post(`${BASE}/api/admin/embassies`, form, authHeaders);
        setSuccess("Embassy added successfully.");
      }
      setShowForm(false); setEditId(null);
      await fetchEmbassies();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed.");
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id) {
    setError(""); setSuccess("");
    try {
      await axios.delete(`${BASE}/api/admin/embassies/${id}`, authHeaders);
      setSuccess("Embassy deleted successfully.");
      setConfirmDelete(null);
      await fetchEmbassies();
    } catch (err) {
      setError(err.response?.data?.message || "Deletion failed.");
    }
  }

  return (
    <div className="page-wrapper">
      <Navbar role="admin" backPath="/admin/dashboard" />
      <div className="page-content" style={{ maxWidth: 800 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
          <div>
            <h1 className="section-title" style={{ marginBottom: 4 }}>Embassy Management</h1>
            <p style={{ fontSize: 14, color: "var(--text-secondary)" }}>Add, update, or remove embassies from the system.</p>
          </div>
          <button className="btn btn-primary" onClick={openAdd}>+ Add Embassy</button>
        </div>

        {error   && <div className="msg-error">{error}</div>}
        {success && <div className="msg-success">{success}</div>}

        {/* Add / Edit Form */}
        {showForm && (
          <div className="card" style={{ marginBottom: 24 }}>
            <p style={{ fontWeight: 600, marginBottom: 18 }}>{editId ? "Edit Embassy" : "Add New Embassy"}</p>
            <form onSubmit={handleSave}>
              <div style={{ display: "flex", gap: 16 }}>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Embassy Name</label>
                  <input placeholder="e.g. USA Embassy" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
                </div>
                <div className="form-group" style={{ flex: 1 }}>
                  <label>Country</label>
                  <input placeholder="e.g. USA" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button className="btn btn-outline" type="button" onClick={() => setShowForm(false)}>Cancel</button>
                <button className="btn btn-primary" type="submit" disabled={loading}>
                  {loading ? "Saving…" : editId ? "Update" : "Add Embassy"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Embassy Table */}
        <div className="card" style={{ padding: 0, overflow: "hidden" }}>
          {embassies.length === 0 ? (
            <p style={{ padding: 28, color: "var(--text-muted)", fontSize: 14 }}>No embassies found.</p>
          ) : (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Embassy Name</th>
                  <th>Country</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {embassies.map(emb => (
                  <tr key={emb._id || emb.id}>
                    <td style={{ fontWeight: 500 }}>{emb.name}</td>
                    <td>{emb.country}</td>
                    <td>
                      {confirmDelete === (emb._id || emb.id) ? (
                        <div style={{ display: "flex", gap: 8 }}>
                          <span style={{ fontSize: 13, color: "var(--text-secondary)", alignSelf: "center" }}>Confirm delete?</span>
                          <button className="btn btn-danger" style={{ fontSize: 12, padding: "5px 10px" }} onClick={() => handleDelete(emb._id || emb.id)}>Yes</button>
                          <button className="btn btn-outline" style={{ fontSize: 12, padding: "5px 10px" }} onClick={() => setConfirmDelete(null)}>No</button>
                        </div>
                      ) : (
                        <div style={{ display: "flex", gap: 8 }}>
                          <button className="btn btn-outline" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => openEdit(emb)}>Edit</button>
                          <button className="btn btn-danger" style={{ fontSize: 12, padding: "6px 12px" }} onClick={() => setConfirmDelete(emb._id || emb.id)}>Delete</button>
                        </div>
                      )}
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

export default EmbassyManagement;
