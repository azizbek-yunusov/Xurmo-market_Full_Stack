const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
    },
    rating: {
      type: Number,
    },
    comment: {
      type: String,
    },
    pictures: [
      {
        public_id: {
          type: String,
          // required: true,
        },
        url: {
          type: String,
          // required: true,
        },
      },
    ],
    likes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    unLikes: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reply: [
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    updatedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Review", reviewSchema);
