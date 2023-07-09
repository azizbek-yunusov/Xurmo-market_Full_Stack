const { Schema, model } = require("mongoose");

const cartSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  products: [
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
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Cart", cartSchema);

cartSchema.methods.addToCart = function (product) {
  let cart = [...this.cart];
  const index = cart.findIndex((e) => {
    return e.productId.toString() === product._id.toString();
  });

  if (index >= 0) {
    cart[index].quantity = cart[index].quantity + 1;
  } else {
    cart.push({
      productId: product._id,
      quantity: 1,
    });
  }

  const newCart = cart;
  this.cart = newCart;

  return this.save();
};

cartSchema.methods.removeFromCart = function (id) {
  let cart = [...this.cart];
  cart = cart.filter((e) => e.productId.toString() !== id.toString());

  const newCart = cart;
  this.cart = newCart;
  return this.save();
};

cartSchema.methods.decrementQty = function (id) {
  let cart = [...this.cart];
  const index = cart.findIndex((e) => e.productId.toString() === id.toString());

  if (cart[index].quantity === 1) {
    cart = cart.filter((s) => s.productId.toString() !== id.toString());
  } else {
    cart[index].quantity--;
  }

  const newCart = cart;
  this.cart = newCart;
  return this.save();
};
