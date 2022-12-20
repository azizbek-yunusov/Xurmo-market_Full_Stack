const { Router } = require("express");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const router = Router();

router.post("/order", authMiddleware, async (req, res) => {
  const {
    shippingAddress,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;
  const customer = await UserModel.findById(req.user).populate(
    "cart.productId",
    "_id name price images"
  );
  const product = customer.cart.map((c) => ({
    quantity: c.quantity,
    productId: { ...c.productId._doc },
  }));
  const newOrder = await OrderModel.create({
    orderItems: product,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user,
  });
  const order = await newOrder.save();
  res.status(201).json({ message: "New Order Created", order });
});

router.get("/orders", authMiddleware, async (req, res) => {
  try {
    const orders = await OrderModel.find().populate(
      "orderItems.productId",
      "_id name price images"
    );
    res.status(200).json({orders});
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.get("/orders/:id", authMiddleware, async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "orderItems.productId",
      "name"
    );
    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});
router.get("/myorders", authMiddleware, async (req, res) => {
  try {
    const orders = await OrderModel.findById(req.user).populate("user", "name");
    res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
