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
      const user = await UserModel.findById(req.params.id);
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
router.put("/profile", authAdminMiddleware, async (req, res) => {
  const user = await UserModel.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 8);
    }

    const updatedUser = await user.save();
    res.send({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      admin: updatedUser.admin,
      token: generateToken(updatedUser),
    });
  } else {
    res.status(404).send({ message: "User not found" });
  }
});

router.delete("/user/delete/:id", authMiddleware, async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    msg: "DELETED USER",
  });
});

module.exports = router;
