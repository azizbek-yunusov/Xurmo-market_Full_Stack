const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  name: {
    type: String,
  },
  lastName: {
    type: String,
  },
  contact: {
    type: String,
  },
  email: {
    type: String,
  },
  shippingAddress: {
    region: {
      type: String,
    },
    district: {
      type: String,
    },
    street: {
      type: String,
    },
    house: {
      type: String,
    },
    other: {
      type: String,
    },
    postalCode: { type: String },
  },
  orderItems: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
      },
    },
  ],
  totalPrice: {
    type: Number,
  },
  shippingPrice: {
    type: Number,
  },
  isPaid: { type: Boolean, default: false },
  paymentMethod: {
    type: String,
  },
  deliveryType: {
    type: String,
  },
  status: {
    type: String,
    default: "shipped"
  },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Order", orderSchema);
