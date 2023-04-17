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
        required: true,
      },
      reviewId: {
        type: Schema.Types.ObjectId,
        ref: "Review",
        default: null
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
    default: "Accepted",
    enum: [
      "Accepted",
      "UnderAnalysis",
      "Done",
      "Dispatched",
      "Rejected",
      "Delivered",
    ],
  },
  statusHistory: [
    {
      orderStatus: {
        type: String,
      },
      date: {
        type: Date,
      },
    },
  ],
  paymentStatus: {
    type: String,
    default: "Unpaid",
    enum: ["Unpaid", "Pending", "Paid", "Returned"],
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
  },
});

orderSchema.methods.addReviewId = function (product, review) {
  let orderItems = [...this.orderItems];
  const index = orderItems.findIndex((e) => {
    return e.productId.toString() === product._id.toString();
  });

  if (index >= 0) {
    orderItems[index].reviewId = review._id;
  }
  const newOrderItems = orderItems;
  this.orderItems = newOrderItems;

  return this.save();
};

module.exports = model("Order", orderSchema);
