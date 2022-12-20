const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const authMiddleware = require("../middleware/authMiddleware");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const JWT_SECRET = process.env.JWT_SECRET;

router.get("/users", authMiddleware, authAdminMiddleware, async (req, res) => {
  const users = await UserModel.find();
  res.status(200).json({
    users,
  });
});
router.get(
  "/user/:id",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id).populate(
        "cart.productId",
        "_id name, price, images"
      );
      if (!user) {
        res.status(404).json({ message: "User Not Found" });
      } else {
        res.status(200).json({ user });
      }
    } catch (err) {
      console.log(err);
    }
  }
);
router.put(
  "/user/update/:id",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    try {
      const user = await UserModel.findById(req.params.id);
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.admin = req.body.admin || user.admin;
        const updatedUser = await user.save();
        res.json({
          name: updatedUser.name,
          email: updatedUser.email,
          admin: updatedUser.admin,
        });
      } else {
        res.status(404).send({ message: "User not found" });
      }
    } catch (err) {
      console.log(err);
    }
  }
);
router.delete("/user/delete/:id", authMiddleware, async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    msg: "DELETED USER",
  });
});
// my profile
router.get("/infor", authMiddleware, async (req, res) => {
  try {
    const userItems = await UserModel.findById(req.user).populate(
      "cart.productId",
      "_id name images price"
    );
    res.status(200).json(userItems.cart);
  } catch (err) {
    console.log();
  }
});

module.exports = router;
