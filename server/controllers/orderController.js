const OrderModel = require("../models/OrderModel");
const UserModel = require("../models/UserModel");
const { sendOrder } = require("./sendMailController");

const newOrder = async (req, res) => {
  try {
    const customer = await UserModel.findById(req.user.id).populate(
      "cart.productId",
      "_id name price images"
    );
    const product = customer.cart.map((c) => ({
      quantity: c.quantity,
      productId: { ...c.productId._doc },
    }));
    req.body.orderItems = product;
    req.body.user = req.user.id;

    const newOrder = await OrderModel.create(req.body);
    
    const order = await newOrder.save();
    await customer.cleanCart();
    // await sendOrder({
    //   email: customer.email,
    // });
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
    const orders = await OrderModel.find({ user: req.user.id })
      .populate("user", "_id name")
      .populate("orderItems.productId", "_id name price images");
    res.status(200).json({ orders });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
module.exports = { newOrder, getAllOrders, getOrder, getMyOrders };
