import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "./Navbar";

const BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";
const FEE   = 5000; // fixed visa fee in INR

/* POST /api/payments/create-order → { orderId }
   POST /api/payments/verify       → { status }  */
function Payment() {
  const { state } = useLocation();
  const navigate  = useNavigate();
  const applicationId = state?.applicationId || "";

  const [orderId, setOrderId]   = useState(null);
  const [payStatus, setPayStatus] = useState(""); // "", "success", "failed"
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const token = localStorage.getItem("token");
  const authHeaders = { headers: { Authorization: `Bearer ${token}` } };

  /* Create order on mount */
  useEffect(() => {
    if (!applicationId) return;
    async function createOrder() {
      try {
        setLoading(true);
        const res = await axios.post(`${BASE}/api/payments/create-order`, { applicationId, amount: FEE }, authHeaders);
        setOrderId(res.data.orderId);
      } catch {
        setError("Failed to create payment order. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    createOrder();
  }, [applicationId]);

  /* Simulate verify (Razorpay or similar would call this via webhook/callback) */
  async function handleVerify(paymentId) {
    try {
      setLoading(true);
      const res = await axios.post(`${BASE}/api/payments/verify`, { orderId, paymentId }, authHeaders);
      setPayStatus(res.data.status === "Success" ? "success" : "failed");
    } catch {
      setPayStatus("failed");
    } finally {
      setLoading(false);
    }
  }

  if (!applicationId) {
    return (
      <div className="page-wrapper">
        <Navbar role="applicant" backPath="/dashboard" />
        <div className="page-content" style={{ maxWidth: 480 }}>
          <div className="msg-error">No application linked. Return to Dashboard.</div>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      <Navbar role="applicant" backPath="/dashboard" />
      <div className="page-content" style={{ maxWidth: 480 }}>
        <h1 className="section-title">Payment</h1>
        <p className="section-sub">Complete your visa fee payment to finalise the application.</p>

        <div className="card">
          {error && <div className="msg-error">{error}</div>}

          {payStatus === "success" && (
            <div>
              <div className="msg-success">Payment successful. Your application has been submitted.</div>
              <button className="btn btn-primary" style={{ marginTop: 16 }} onClick={() => navigate("/dashboard")}>
                Return to Dashboard
              </button>
            </div>
          )}

          {payStatus === "failed" && (
            <div>
              <div className="msg-error">Payment failed. Please try again.</div>
              <button className="btn btn-primary" style={{ marginTop: 14 }} onClick={() => handleVerify("RETRY_" + Date.now())}>
                Retry Payment
              </button>
            </div>
          )}

          {payStatus === "" && (
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                <span style={{ color: "var(--text-secondary)" }}>Application ID</span>
                <span style={{ fontWeight: 500 }}>{applicationId}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                <span style={{ color: "var(--text-secondary)" }}>Visa Fee</span>
                <span style={{ fontWeight: 600 }}>₹{FEE.toLocaleString()}</span>
              </div>
              {orderId && (
                <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 0", borderBottom: "1px solid var(--border)", fontSize: 14 }}>
                  <span style={{ color: "var(--text-secondary)" }}>Order ID</span>
                  <span style={{ fontFamily: "monospace", fontSize: 13 }}>{orderId}</span>
                </div>
              )}
              <p style={{ fontSize: 12, color: "var(--text-muted)", margin: "16px 0", lineHeight: 1.5 }}>
                Secure payment via UPI, Card, or Net Banking. Sensitive payment details are not stored.
              </p>
              <button
                className="btn btn-primary" style={{ width: "100%" }}
                disabled={loading || !orderId}
                onClick={() => handleVerify("PAY_" + Date.now())}  /* replace with real Razorpay handler */
              >
                {loading ? "Processing…" : "Pay ₹" + FEE.toLocaleString()}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Payment;
