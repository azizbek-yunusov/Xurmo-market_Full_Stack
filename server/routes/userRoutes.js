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

router.delete(
  "/user/delete/:id",
  authMiddleware,
  async (req, res) => {
    await UserModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      msg: "DELETED USER",
    });
  }
);
module.exports = router;
