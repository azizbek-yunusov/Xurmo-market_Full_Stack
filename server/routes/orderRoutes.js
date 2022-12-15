const { Router } = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const router = Router();

router.post("/order/new", authMiddleware, async (req, res) => {
  const {
    shippingAddress,
    orderItems,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const newOrder = new OrderModel.create({
    orderItems,
    shippingAddress,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    user: req.user,
  });
  const order = await newOrder.save();
  res.status(201).send({ message: "New Order Created", order });
});

module.exports = router;
