const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");

const newOrder = async (req, res) => {
  try {
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
      shippingAddress: customer.addresses[0],
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
      user: req.user,
    });
    const order = await newOrder.save();
    await customer.cleanCart();
    res.status(201).json({ message: "New Order Created", order });
  } catch (err) {
    console.log(err);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find()
      .populate("orderItems.productId", "_id name price images")
      .populate("user", "_id name");
    res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "orderItems.productId",
      "name"
    );
    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user._id }).populate(
      "user",
      "_id name"
    ).populate("orderItems.productId", "_id name price images")
    res.status(200).json({orders});
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = { newOrder, getAllOrders, getOrder, getMyOrders };
