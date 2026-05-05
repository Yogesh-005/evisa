import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

/* Step 1: Enter passport ID → request OTP
   Step 2: Enter OTP → verify → redirect to dashboard */
function ApplicantLogin() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);               // 1 = passport entry, 2 = OTP
  const [passportId, setPassportId] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [resent, setResent] = useState(false);

  /* Send OTP — POST /api/auth/send-otp */
  async function handleSendOtp(e) {
    e.preventDefault();
    setError("");
    if (!passportId.trim()) return setError("Passport ID is required.");
    try {
      setLoading(true);
      await axios.post(`${BASE}/api/auth/send-otp`, { identifier: passportId, purpose: "LOGIN" });
      setStep(2);
    } catch {
      setError("Failed to send OTP. Please check your Passport ID.");
    } finally {
      setLoading(false);
    }
  }

  /* Resend OTP */
  async function handleResend() {
    setError(""); setResent(false);
    try {
      await axios.post(`${BASE}/api/auth/send-otp`, { identifier: passportId, purpose: "LOGIN" });
      setResent(true);
    } catch {
      setError("Could not resend OTP. Try again.");
    }
  }

  /* Verify OTP — POST /api/auth/verify-otp */
  async function handleVerifyOtp(e) {
    e.preventDefault();
    setError("");
    if (!otp.trim()) return setError("Please enter the OTP.");
    try {
      setLoading(true);
      const res = await axios.post(`${BASE}/api/auth/verify-otp`, { identifier: passportId, purpose: "LOGIN", otp });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      navigate("/dashboard");
    } catch {
      setError("Invalid or expired OTP.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-wrapper" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
      <div style={{ width: "100%", maxWidth: 400 }}>

        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28 }}>Applicant Login</p>
          <p style={{ color: "var(--text-secondary)", fontSize: 14, marginTop: 6 }}>
            {step === 1 ? "Enter your Passport ID to receive an OTP." : `OTP sent to your registered contact.`}
          </p>
        </div>

        <div className="card">
          {error && <div className="msg-error">{error}</div>}
          {resent && <div className="msg-success">OTP resent successfully.</div>}

          {step === 1 ? (
            <form onSubmit={handleSendOtp}>
              <div className="form-group">
                <label>Passport ID</label>
                <input
                  type="text" placeholder="e.g. A12345678"
                  value={passportId} onChange={e => setPassportId(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
                {loading ? "Sending OTP…" : "Send OTP"}
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp}>
              <div className="form-group">
                <label>One-Time Password</label>
                <input
                  type="text" placeholder="Enter 6-digit OTP" maxLength={6}
                  value={otp} onChange={e => setOtp(e.target.value)}
                />
              </div>
              <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: "100%", marginTop: 8 }}>
                {loading ? "Verifying…" : "Verify & Login"}
              </button>
              <button type="button" className="btn btn-outline" style={{ width: "100%", marginTop: 10 }} onClick={handleResend}>
                Resend OTP
              </button>
              <button type="button" onClick={() => { setStep(1); setError(""); }} style={{ background: "none", border: "none", fontSize: 13, color: "var(--text-muted)", cursor: "pointer", marginTop: 12, display: "block" }}>
                ← Change Passport ID
              </button>
            </form>
          )}

          <div className="divider" />
          <p style={{ fontSize: 13, textAlign: "center", color: "var(--text-secondary)" }}>
            New applicant?{" "}
            <span style={{ color: "var(--text-primary)", fontWeight: 600, cursor: "pointer" }} onClick={() => navigate("/applicant/register")}>
              Register Now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ApplicantLogin;
