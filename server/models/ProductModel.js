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
    brand: { type: String },
    discount: {
      type: Number,
      default: 0,
    },
    inStock: {
      type: Number,
      default: 1,
    },
    category: {
      type: String,
    },
    ratings: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    reviews: [
      {
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
        dislikes: [
          {
            type: Schema.Types.ObjectId,
            ref: "User",
          },
        ],
        isShow: {
          type: Boolean,
          default: true,
        },
        createdAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],

    isShow: {
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
