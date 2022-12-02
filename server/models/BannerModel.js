const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    href: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Banner", productSchema);
