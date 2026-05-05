/**
 * Single source of truth for backend configuration.
 *
 * All other modules MUST read secrets/config from this file (not from
 * `process.env` directly), so that changing a value in `.env` propagates
 * everywhere without hunting through the codebase.
 */
require("dotenv").config();

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

const config = {
  port: parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV || "development",

  mongoUri: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/evidms",

  jwt: {
    secret: process.env.JWT_SECRET || "dev-only-change-me",
    expiresIn: process.env.JWT_EXPIRES_IN || "1d",
  },

  email: {
    brevoApiKey: process.env.BREVO_API_KEY || "",
    from: process.env.EMAIL_FROM || "no-reply@example.com",
    fromName: process.env.EMAIL_FROM_NAME || "E-Visa App",
  },

  clientOrigin: process.env.CLIENT_ORIGIN || "http://localhost:3000",

  required,
};

module.exports = config;
