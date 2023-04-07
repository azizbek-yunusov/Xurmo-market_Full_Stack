const { Schema, model } = require("mongoose");

const userOtp = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = model("userOtp", userOtp);
