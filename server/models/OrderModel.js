const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  shippingInfo: {
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
    pinCode: {
      type: Number,
    },
    phoneNo: {
      type: Number,
    },
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
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  paidAt: {
    type: Date,
  },
  itemsPrice: {
    type: Number,
    default: 0,
  },
  taxPrice: {
    type: Number,

    default: 0,
  },
  shippingPrice: {
    type: Number,

    default: 0,
  },
  totalPrice: {
    type: Number,

    default: 0,
  },
  orderStatus: {
    type: String,

    default: "Processing",
  },
  deliveredAt: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model("Order", orderSchema);
