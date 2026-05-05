const mongoose = require("mongoose");
const userSchema = require("../schemas/userSchema");

/**
 * User Model — created from userSchema.
 */
const User = mongoose.model("User", userSchema);

module.exports = User;
