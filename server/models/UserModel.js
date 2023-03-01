const { Schema, model } = require("mongoose");

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
      default: '/Avatars/lpsik4m2oowrlowbyq3l'
    },
    url: {
      type: String,
      default: 'https://res.cloudinary.com/dztvgxnaj/image/upload/v1674919995/Avatars/lpsik4m2oowrlowbyq3l.png',
      required: true,
    },
  },
  phoneNumber: {
    type: String,
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
  addresses: [
    {
      country: {
        type: String,
      },
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
      apartment: {
        type: String,
      },
      isActive: {
        type: Boolean,
        default: false,
      },
      other: {
        type: String,
      },
      postalCode: { type: String },
    },
  ],
  favorites: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],
  admin: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});
// Add to cart product functions
userSchema.methods.addToCart = function (product) {
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

userSchema.methods.removeFromCart = function (id) {
  let cart = [...this.cart];
  cart = cart.filter((e) => e.productId.toString() !== id.toString());

  const newCart = cart;
  this.cart = newCart;
  return this.save();
};

userSchema.methods.decrementQty = function (id) {
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

userSchema.methods.cleanCart = function () {
  this.cart = [];
  return this.save();
};

userSchema.methods.removeFromAddress = function (id) {
  let addresses = [...this.addresses];
  addresses = addresses.filter((s) => s._id.toString() !== id.toString());

  const newAddresses = addresses;
  this.addresses = newAddresses;
  return this.save();
};

// Add favorite product funtion
userSchema.methods.newFavorite = function (product) {
  let favorites = [...this.favorites];

  favorites.push({ productId: product._id });

  const newFavorites = favorites;
  this.favorites = newFavorites;

  return this.save();
};

userSchema.methods.removeFromFavorite = function (id) {
  let favorites = [...this.favorites];
  favorites = favorites.filter((s) => s.productId.toString() !== id.toString());

  const newFavorites = favorites;
  this.favorites = newFavorites;
  return this.save();
};

module.exports = model("User", userSchema);
