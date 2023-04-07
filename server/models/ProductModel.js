const { Schema, model } = require("mongoose");

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
    oldPrice: {
      type: Number,
    },
    descr: {
      type: String,
      required: true,
    },
    images: [
      {
        public_id: {
          type: String,
          required: true,
        },
        url: {
          type: String,
          required: true,
        },
      },
    ],
    brand: { type: String, required: true },
    discount: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 1,
    },
    sold: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
      required: true,
    },
    categoryChild: {
      type: String,
      // required: true,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },

    features: [
      {
        feature: {
          type: String,
        },
        value: {
          type: String,
        },
      },
    ],
    isActive: {
      type: Boolean,
      default: true,
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
