import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api";

/* Step 1: Fill details & upload passport copy → POST /api/auth/register
   Step 2: Verify OTP sent to email/mobile → POST /api/auth/verify-otp */
function ApplicantRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ passportId: "", email: "", mobileNumber: "" });
  const [passportFile, setPassportFile] = useState(null);
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  /* Register — POST /api/auth/register then send OTP */
  async function handleRegister(e) {
    e.preventDefault();
    setError("");
    const { passportId, email, mobileNumber } = form;
    if (!passportId || !email || !mobileNumber || !passportFile) {
      return setError("All fields including passport scan are required.");
    }
    /* Basic format guards */
    if (!/^[A-Z]{1}[0-9]{8}$/.test(passportId)) return setError("Invalid Passport ID format (e.g. A12345678).");
    if (!/^\S+@\S+\.\S+$/.test(email))           return setError("Invalid email address.");
    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(passportFile.type)) return setError("Passport scan must be JPG, PNG, or PDF.");

    try {
      setLoading(true);
      await api.post(`/api/auth/send-otp`, { passportId, email, mobileNumber, purpose: "register" });
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  /* Verify OTP — POST /api/auth/verify-otp */
  async function handleVerify(e) {
    e.preventDefault();
    setError("");
    if (!otp.trim()) return setError("Please enter the OTP.");
    try {
      setLoading(true);
      const res = await api.post(`/api/auth/verify-otp`, { passportId: form.passportId, purpose: "register", otp });
      if (res.data.token) localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", "applicant");
      navigate("/applicant/login");
    } catch {
      setError("Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 440 }}>

        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>Create Account</p>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 6 }}>
            {step === 1 ? "Register with your passport details." : "Enter the OTP sent to your email."}
          </p>
        </div>

        <div className="card">
          {error && <div className="msg-error">{error}</div>}

          {step === 1 ? (
            <form onSubmit={handleRegister}>
              <div className="form-group">
                <label>Passport ID</label>
                <input name="passportId" placeholder="e.g. A12345678" value={form.passportId} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Mobile Number</label>
                <input name="mobileNumber" type="tel" placeholder="10-digit mobile number" value={form.mobileNumber} onChange={handleChange} />
              </div>
              <div className="form-group">
                <label>Scanned Passport Copy</label>
                <input type="file" accept=".jpg,.jpeg,.png,.pdf" onChange={e => setPassportFile(e.target.files[0])} />
                <span style={{ fontSize: 12, color: "var(--text-muted)" }}>Accepted: JPG, PNG, PDF</span>
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
                {loading ? "Registering…" : "Register & Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerify}>
              <p style={{ fontSize: 14, color: "var(--text-secondary)", marginBottom: 20 }}>
                An OTP has been sent to <strong>{form.email}</strong>.
              </p>
              <div className="form-group">
                <label>One-Time Password</label>
                <input type="text" placeholder="Enter OTP" maxLength={6} value={otp} onChange={e => setOtp(e.target.value)} />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
                {loading ? "Verifying…" : "Verify & Continue"}
              </button>
            </form>
          )}

          <div className="divider" />
          <p style={{ fontSize: 13, textAlign: "center", color: "var(--text-secondary)" }}>
            Already registered?{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/applicant/login")}>
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApplicantRegister;
