/**
 * Generate a short, human-friendly application id like `APP9X4Y2K`.
 */
exports.generateApplicationId = () => {
  const chars = "ABCDEFGHJKMNPQRSTUVWXYZ23456789"; // no I/O/0/1 to avoid confusion
  let suffix = "";
  for (let i = 0; i < 6; i++) {
    suffix += chars[Math.floor(Math.random() * chars.length)];
  }
  return `APP${suffix}`;
};
