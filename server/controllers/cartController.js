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

const decrementQtyItem = async (req, res) => {
  try {
    const client = await UserModel.findById(req.user.id);
    await client.decrementQty(req.params.id);

    res.status(200).json({ client, msg: "product delete from cart" });
  } catch (err) {
    console.log(err);
  }
};

const addToFavorite = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ msg: "Product not found" });
    }
    const client = await UserModel.findById(req.user.id);
    await client.newFavorite(product);
    res.status(200).json({ client });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getFavorites = async (req, res) => {
  try {
    const allFavorites = await UserModel.findById(req.user.id).populate(
      "favorites.productId",
      "_id name price images discount inStock numOfReviews reviews ratings"
    );
    let { favorites } = allFavorites;
    res.status(200).json(favorites);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteFavoriteItem = async (req, res) => {
  try {
    const client = await UserModel.findById(req.user.id);
    await client.removeFromFavorite(req.params.id);

    res.status(200).json({ client, msg: "product delete from favorite" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  addToCart,
  myCart,
  deleteCartItems,
  decrementQtyItem,
  addToFavorite,
  getFavorites,
  deleteFavoriteItem,
};
