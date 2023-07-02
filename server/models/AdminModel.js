const { Schema, model } = require("mongoose");

const adminSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      trim: true,
    },
    userName: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["activated", "banned"],
      default: "activated",
    },
    role: {
      type: String,
      enum: ["admin", "owner"],
      default: "admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Admin", adminSchema);
