/**
 * Single source of truth for frontend environment values.
 * Change `.env` (REACT_APP_*) and every consumer in the app picks it up.
 */
export const API_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000";

export const APP_NAME = process.env.REACT_APP_NAME || "EVIDMS";
