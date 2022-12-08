const { Schema, model } = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    comment: { type: String, required: true },
    rating: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    descr: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    picture: {
      type: String,
    },
    brand: { type: String },
    countInStock: {
      type: Number,
    },
    rating: { type: Number },
    numReviews: { type: Number },
    reviews: [reviewSchema],
    category: {
      type: String,
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

module.exports = model("Product", productSchema);
