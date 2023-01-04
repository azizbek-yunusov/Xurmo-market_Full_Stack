const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");

const addToCart = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ msg: "Product not found" });
    }
    const client = await UserModel.findById(req.user.id);
    await client.addToCart(product);
    res.status(200).json({ client });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const myCart = async (req, res) => {
  try {
    const mycart = await UserModel.findById(req.user.id).populate(
      "cart.productId",
      "_id name price images"
    );
    let { cart } = mycart;
    res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    const client = await UserModel.findById(req.user.id);
    await client.removeFromCart(req.params.id);

    res.status(200).json({ client, msg: "product delete from cart" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = { addToCart, myCart, deleteCartItems };
