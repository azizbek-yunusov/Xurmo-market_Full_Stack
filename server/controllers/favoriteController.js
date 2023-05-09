const FavoriteProductModel = require("../models/FavoriteProductModel");
const ProductModel = require("../models/ProductModel");

const addToFavorites = async (req, res) => {
  try {
    const user = req.user.id;
    const productId = req.params.id;
    const product = ProductModel.findById(productId);
    if (!product) {
      return res.status(500).json({ msg: "Product not found" });
    }
    let favorite = await FavoriteProductModel.findOne({ user });
    if (!favorite) {
      favorite = new FavoriteProductModel({
        user,
        products: [],
      });
    }
    const products = favorite.products.map((p) => p.toString());
    if (products.includes(productId)) {
      return res
        .status(400)
        .json({ msg: "Mahsulot allaqachon sevimlilarda mavjud" });
    }
    favorite.products.push(productId);
    await favorite.save();
    favorite = await FavoriteProductModel.findOne({ user }).populate(
      "products",
      "_id name price images discount inStock numOfReviews ratings"
    );
    res.status(200).json({ msg: "Success", favorite });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const deleteFromFavorites = async (req, res) => {
  try {
    const user = req.user.id;
    let favorite = await FavoriteProductModel.findOne({ user });
    if (!favorite) {
      return res.status(400).json({ msg: "Sevimli mahsulotlar toplimadi" });
    }
    await favorite.removeFromFavorite(req.params.id);
    favorite = await FavoriteProductModel.findOne({ user }).populate(
      "products",
      "_id name price images discount inStock numOfReviews ratings"
    );
    res.status(200).json({ msg: "Success", favorite });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

const clearFavorite = async (req, res) => {
  try {
    await FavoriteProductModel.findOneAndUpdate(
      { user: req.user.id },
      {
        products: [],
      },
      { new: true }
    );
    res.status(200).json({ msg: "Success" });
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};

module.exports = { addToFavorites, deleteFromFavorites, clearFavorite };
