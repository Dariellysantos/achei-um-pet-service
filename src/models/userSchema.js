const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  socialMedia: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
  deletedAt: {
    type: Date,
    default: new Date(),
  },
  password: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("user", userSchema);