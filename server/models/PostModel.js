const { Schema, model } = require("mongoose");

const postSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    excerpt: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    content: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
    viewsCount: {
      type: Number,
      default: 0,
    },
    isShow: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Post", postSchema);
