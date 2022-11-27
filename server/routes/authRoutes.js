const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, admin } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    // Check email
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "This email already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      admin
    });
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    await user.save();
    user.password = undefined
    res.status(200).json({ token, user, msg: "User added successfully" });
  } catch (err) {
    console.log(err);
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check email
    const savedUser = await UserModel.findOne({ email });
    if (!savedUser) {
      return res.status(400).json({ error: "Your email is incorrect" });
    }
    // Check password
    const isPasswordValid = await bcrypt.compare(password, savedUser.password);
    if (isPasswordValid) {
      const token = jwt.sign({ _id: savedUser._id }, JWT_SECRET);
      const { _id, name, email, admin } = savedUser;
      res
        .status(200)
        .json({ token, user: { _id, name, email, admin }, msg: "ok" });
    } else {
      return res.status(400).json({ error: "Your password is incorrect" });
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
