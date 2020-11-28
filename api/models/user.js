const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  full_name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  ga_email: { type: String, required: true, unique: true },
  active: { type: Boolean, default: false }, // determines if server will automatically send requests,
  last_declared: Date,
  password:  { type: String, required: true, unique: true },
  created_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const UserModel = mongoose.model("User", userSchema);

module.exports = UserModel;
