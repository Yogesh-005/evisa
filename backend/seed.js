/**
 * Database seeder.
 * Run with `npm run seed` from the backend folder.
 */
const mongoose = require("mongoose");
const config = require("./config/env");
const User = require("./models/User");

async function seed() {
  await mongoose.connect(config.mongoUri);
  console.log("Connected for seeding");

  // Example: ensure a default admin exists.
  const existing = await User.findOne({ username: "admin" });
  if (!existing) {
    await User.create({
      role: "ADMIN",
      username: "admin",
      password: "changeme1",
    });
    console.log("Seeded default admin (username=admin, password=changeme1)");
  } else {
    console.log("Admin already exists, skipping");
  }

  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
