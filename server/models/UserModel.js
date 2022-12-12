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
  admin: {
    type: Boolean,
    required: true,
    default: false,
  },
  cart: [
    {
      count: {
        type: Number,
        default: 1,
      },
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
    },
  ],

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
    cart[index].count = cart[index].count + 1;
  } else {
    cart.push({
      productId: product._id,
      count: 1,
    });
  }

  const newCart = cart;
  this.cart = newCart;

  return this.save();
};
userSchema.methods.removeFromCart = function (id) {
  let cart = [...this.cart];
  const index = cart.findIndex((s) => s.productId.toString() === id.toString());

  if (cart[index].count === 1) {
    cart = cart.filter((s) => s.productId.toString() !== id.toString());
  } else {
    cart[index].count--;
  }

  const newCart = cart;
  this.cart = newCart;
  return this.save();
};

module.exports = model("User", userSchema);
