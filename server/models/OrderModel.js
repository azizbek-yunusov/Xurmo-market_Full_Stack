const { Schema, model } = require("mongoose");

const orderSchema = new Schema({
  orderId: {
    type: String,
    required: true,
  },
  firstName: {
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
  paymentMethod: {
    type: String,
    default: "Cash on Delivery",
    enum: [
      "Cash on Delivery",
      "Payme",
      "UZCARD or XUMO",
      "Delivery by Card",
      "Through Card",
      "Installment",
    ],
  },
  deliveryType: {
    type: String,
    default: "Delivery address",
    enum: ["Delivery address", "Store pickup"],
  },
  isDelivered: { type: Boolean, default: false },
  deliveredAt: { type: Date },
  orderStatus: {
    type: String,
    default: "Not Processed",
    enum: [
      "Order Placed",
      "Not Processed",
      "Shipped",
      "Cash on Delivery",
      "Processing",
      "Dispatched",
      "Cancelled",
      "Delivered",
    ],
  },
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
