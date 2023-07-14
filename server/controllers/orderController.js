const CartModel = require("../models/CartModel");
const OrderModel = require("../models/OrderModel");
const ProductModel = require("../models/ProductModel");
const UserModel = require("../models/UserModel");
const { sendMail } = require("../utils/sendEmail");

function generateOrderId() {
  let number = "";
  for (let i = 0; i < 5; i++) {
    number += Math.floor(Math.random() * 10).toString();
  }
  return number;
}

const newOrder = async (req, res) => {
  try {
    const user = req.user.id;
    const customer = await UserModel.findById(user);
    let cart = await CartModel.findOne({ user });
    const products = cart.products.map((c) => ({
      quantity: c.quantity,
      productId: c.productId,
    }));
    req.body.orderItems = products;
    req.body.user = req.user.id;
    req.body.orderId = generateOrderId();

    const newOrder = await OrderModel.create(req.body);
    const statusHistory = {
      orderStatus: req.body.orderStatus,
      date: new Date(),
    };
    newOrder.statusHistory.push(statusHistory);
    const order = await newOrder.save();

    let update = products.map((item) => {
      return {
        updateOne: {
          filter: { _id: item.productId },
          update: { $inc: { inStock: -item.quantity, sold: +item.quantity } },
        },
      };
    });
    await ProductModel.bulkWrite(update, {});
    await sendMail(
      customer.email,
      `Sizning buyutmangiz qabul qilindi`,
      `Assalomu alaykum,\n\nSizning internet-magazinimizda buyurtma berishni xohlaganiz uchun tashakkur. \n Buyurtmangiz muvaffaqiyatli qabul qilindi va tez orada yetkazib beriladi. Siz bilan yana bir marotaba bog'lanib, buyurtma haqida batafsil ma'lumot beramiz.\n\nTashakkur,\n\n[Xurmo.uz]`
    );
    res.status(201).json({ message: "New Order Created", order });
  } catch (err) {
    console.log(err);
  }
};

const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find().sort({ createdAt: -1 })
      .populate("orderItems.productId", "_id name price images")
      .populate("user", "_id name email avatar");
    res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getOrder = async (req, res) => {
  try {
    const order = await OrderModel.findById(req.params.id).populate(
      "orderItems.productId",
      "_id name price images"
    );
    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({ user: req.user.id })
      .populate("user", "_id name email avatar")
      .populate("orderItems.productId", "_id name price images")
      .populate("orderItems.reviewId", "_id rating comment pictures");
    res.status(200).json(orders);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const statusHistory = {
      orderStatus: status,
      date: new Date(),
    };
    await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: status,
        updatedAt: new Date(),
      },
      {
        new: true,
      }
    );

    let order = await OrderModel.findById(req.params.id).populate(
      "orderItems.productId",
      "_id name price images"
    );
    order.statusHistory.push(statusHistory);
    await order.save();
    const customer = await UserModel.findById(order.user);
    if (status === "Delivered" || "Done") {
      await sendMail(
        customer.email,
        `Sizning buyutmangiz yetkazildi`,
        `Assalomu alaykum,\n\nSizning buyurtmangiz muvaffaqiyatli yetkazib berildi.\nIltimos, buyurtmani ko'rib chiqing va shikastlangan yoki shikastlanmaganligi bo'yicha yoki shikoyat bo'lsa biz bilan bog'laning.\nSiz bilan hamkorlik qilishdan mamnunmiz.\n\nTashakkur,\n\n[Xurmo.uz]`
      );
      await OrderModel.findByIdAndUpdate(
        req.params.id,
        {
          paymentStatus: "Paid",
          isDelivered: true,
          updatedAt: new Date(),
        },
        {
          new: true,
        }
      );
    }
    if (status === "Rejected") {
      await sendMail(
        customer.email,
        `Sizning buyutmangiz bekor qilindi`,
        `Assalomu alaykum,\n\nSizning buyurtmangiz bekor qilindi. Buyurtma miqdorini sizning bank hisobingizga qaytarib beramiz.\n\nAgar sizning bekor qilish sababingiz bo'lsa, iltimos biz bilan ulashing, sizga yordam berishdan mamnun bo'lamiz.\n\nTashakkur,\n\n[Xurmo.uz]`
      );
      if (paymentStatus == "Paid") {
        await OrderModel.findByIdAndUpdate(
          req.params.id,
          {
            paymentStatus: "Returned",
            updatedAt: new Date(),
          },
          {
            new: true,
          }
        );
      }
    }
    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const resetOrderStatus = async (req, res) => {
  try {
    await OrderModel.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus: "Accepted",
        updatedAt: new Date(),
        statusHistory: {
          orderStatus: "Accepted",
          date: new Date(),
        },
      },
      {
        new: true,
      }
    );

    let order = await OrderModel.findById(req.params.id).populate(
      "orderItems.productId",
      "_id name price images"
    );
    res.status(200).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    selected.forEach((id) => {
      OrderModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Orders Deleted");
        }
      });
    });
    res.status(200).json({ msg: "successfully" });
  } catch (err) {
    console.log(err);
  }
};

const deleteOrder = async (req, res) => {
  try {
    const order = await OrderModel.findByIdAndDelete(req.params.id);
    res.status(201).json(order);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

module.exports = {
  newOrder,
  getAllOrders,
  getOrder,
  deleteSelected,
  getMyOrders,
  updateOrderStatus,
  deleteOrder,
  resetOrderStatus,
};
