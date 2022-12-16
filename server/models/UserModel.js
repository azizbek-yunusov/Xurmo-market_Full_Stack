const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
  },
  image: {
    type: String,
    default:
      "https://res.cloudinary.com/dtabxocmw/image/upload/v1635099407/78-785827_user-profile-avatar-login-account-male-user-icon_kmmxgw.jpg",
  },
  phoneNumber: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
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
  admin: {
    type: Boolean,
    default: false,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
userSchema.methods.addToCart = function (product) {
  let cart = [...this.cart];
  const index = cart.findIndex((s) => {
    return s.productId.toString() === product._id.toString();
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
userSchema.methods.removeFromCart = function (id) {
  let cart = [...this.cart];
  const index = cart.findIndex((s) => s.productId.toString() === id.toString());

  if (cart[index].quantity === 1) {
    cart = cart.filter((s) => s.productId.toString() !== id.toString());
  } else {
    cart[index].quantity--;
  }

  const newCart = cart;
  this.cart = newCart;
  return this.save();
};

module.exports = model("User", userSchema);
