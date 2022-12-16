const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const CartModel = require("../models/CartModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const router = Router();

router.get("/mycart", authMiddleware, async (req, res) => {
  try {
    const mycart = await UserModel.findById(req.user).populate(
      "cart.productId",
      "_id name price images"
    );
    let { cart } = mycart;
    res.status(200).json(cart);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.put("/addcart/:id", authMiddleware, async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    const client = await UserModel.findById(req.user);
    await client.addToCart(product);
    res.status(200).json({ client });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

router.delete("/cart/:id", authMiddleware, async (req, res) => {
  try {
    const client = await UserModel.findById(req.user);
    await client.removeFromCart(req.params.id);

    res.status(200).json({ client, msg: "product delete from cart" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
