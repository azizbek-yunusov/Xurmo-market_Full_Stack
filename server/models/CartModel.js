const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  client: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  cart: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
});

module.exports = model("Cart", cartSchema);
