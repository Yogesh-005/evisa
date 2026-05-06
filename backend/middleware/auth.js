const jwt = require("jsonwebtoken");
const config = require("../config/env");

/**
 * Verify the `Authorization: Bearer <jwt>` header and attach req.user.
 */
function requireAuth(req, res, next) {
  const header = req.header("Authorization") || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ success: false, message: "Authentication required" });
  }

  try {
    const decoded = jwt.verify(token, config.jwt.secret);
    req.user = { id: decoded.id, role: decoded.role };
    return next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid or expired token" });
  }
}

/**
 * Restrict to one or more roles. Use after requireAuth.
 *   router.get('/x', requireAuth, requireRole('applicant'), handler)
 */
function requireRole(...roles) {
  const allowed = roles.map((r) => r.toLowerCase());
  return (req, res, next) => {
    if (!req.user || !allowed.includes(String(req.user.role).toLowerCase())) {
      return res.status(403).json({ success: false, message: "Forbidden" });
    }
    next();
  };
}

module.exports = { requireAuth, requireRole };
