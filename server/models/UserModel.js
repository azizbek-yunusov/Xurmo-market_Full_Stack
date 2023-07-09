const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      default: "/Avatars/lpsik4m2oowrlowbyq3l",
    },
    url: {
      type: String,
      default:
        "https://res.cloudinary.com/dztvgxnaj/image/upload/v1688633939/Avatars/ywpwmyqhnpjljn8u6exk.jpg",
      required: true,
    },
  },
  phoneNumber: {
    type: String,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  otp: {
    type: String,
  },
  otpExpiry: {
    type: Date,
  },
  resetPasswordOtp: {
    type: Number,
  },
  resetPasswordOtpExpiry: {
    type: Date,
  },
  status: {
    type: String,
    default: "Active",
    enum: ["Active", "Banned"],
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

userSchema.index({ otp_expiry: 1 }, { expireAfterSeconds: 0 });

module.exports = model("User", userSchema);
