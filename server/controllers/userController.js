const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const JWT_SECRET = process.env.JWT_SECRET;

const signUp = async (req, res) => {
  try {
    const { name, email, password, admin, cart, addresses } = req.body;
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
      admin,
      cart: [],
      addresses: [],
    });
    const token = jwt.sign({ _id: user._id }, JWT_SECRET);
    await user.save();
    user.password = undefined;
    res.status(200).json({ token, user, msg: "User added successfully" });
  } catch (err) {
    console.log(err);
  }
};

const signIn = async (req, res) => {
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
};

const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json({
      users,
    });
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id).populate(
      "cart.productId",
      "_id name price images"
    );
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      res.status(200).json({ user });
    }
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
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
};

const deleteUser = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    msg: "DELETED USER",
  });
};

const getUserInfo = async (req, res) => {
  try {
    const userItems = await UserModel.findById(req.user).populate(
      "cart.productId",
      "_id name images price"
    );
    res.status(200).json(userItems.cart);
  } catch (err) {
    console.log();
  }
};

const addAdress = async (req, res) => {
  try {
    const {
      country,
      region,
      district,
      street,
      house,
      apartment,
      isActive,
      other,
      postalCode,
    } = req.body;
    const address = {
      country,
      region,
      street,
      district,
      house,
      apartment,
      isActive,
    };
    const user = await UserModel.findById(req.user);
    user.addresses.push(address);
    await user.save();

    res.status(200).json({
      user,
    });
  } catch (err) {
    console.log(err);
  }
};

const getMyAdresses = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user);
    let { addresses } = user;
    res.status(200).json({
      addresses,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteAddress = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user);
    await user.removeFromAddress(req.params.id);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  signUp,
  signIn,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserInfo,
  addAdress,
  getMyAdresses,
  deleteAddress,
};
