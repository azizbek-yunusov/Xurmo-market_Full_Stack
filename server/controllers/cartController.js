const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");

const addToCart = async (req, res) => {
  try {
    const user = req.user.id;

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    let cart = await CartModel.findOne({ user });
    if (!cart) {
      const newCart = await CartModel.create({
        user,
        products: [
          {
            productId: product._id,
            quantity: 1,
          },
        ],
      });
      await newCart.save();
    } else {
      let itemIndex = -1;
      if (cart) {
        itemIndex = cart.products.findIndex(
          (p) => p.productId.toString() === product._id.toString()
        );
      }
      if (itemIndex > -1) {
        const productItem = cart.products[itemIndex];
        if (product.inStock <= productItem.quantity) {
          return res.status(500).json({ err: "product-not" });
        }
        productItem.quantity++;
        cart.products[itemIndex] === productItem;
      } else {
        cart.products.push({
          productId: product._id,
          quantity: 1,
        });
      }
      await cart.save();
    }
    cart = await CartModel.findOne({ user }).populate(
      "products.productId",
      "_id name price images discount inStock numOfReviews ratings"
    );
    res.status(200).json({ msg: "Success", cart });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const user = req.user.id;

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    let cart = await CartModel.findOne({ user });

    let itemIndex = -1;
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === product._id.toString()
    );
    if (itemIndex > -1) {
      cart.products = cart.products.filter(
        (p) => p.productId.toString() !== product._id.toString()
      );
    }

    await cart.save();
    cart = await CartModel.findOne({ user }).populate(
      "products.productId",
      "_id name price images discount inStock numOfReviews ratings"
    );
    res.status(200).json({ msg: "Success", cart });
  } catch (err) {
    console.log(err);
  }
};

const decrementQtyItem = async (req, res) => {
  try {
    const user = req.user.id;

    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }

    let cart = await CartModel.findOne({ user });

    let itemIndex = -1;
    if (!cart) {
      return res.status(404).json({ msg: "Cart not found" });
    }

    itemIndex = cart.products.findIndex(
      (p) => p.productId.toString() === product._id.toString()
    );
    const productItem = cart.products[itemIndex];
    if (itemIndex > -1) {
      if (productItem.quantity === 1) {
        cart.products = cart.products.filter(
          (p) => p.productId.toString() !== product._id.toString()
        );
      } else {
        productItem.quantity--;
        cart.products[itemIndex] === productItem;
      }
    }

    await cart.save();
    cart = await CartModel.findOne({ user }).populate(
      "products.productId",
      "_id name price images discount inStock numOfReviews ratings"
    );
    console.log(cart.products);
    res.status(200).json({ msg: "Success", cart });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const clearCart = async (req, res) => {
  try {
    await CartModel.findOneAndUpdate(
      { user: req.user.id },
      {
        products: [],
      },
      { new: true }
    );
    res.status(200).json({ msg: "Clear cart!" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

module.exports = { addToCart, decrementQtyItem, deleteCartItem, clearCart };
