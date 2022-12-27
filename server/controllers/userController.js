const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const sendMail = require("./sendMailController");
const { google } = require("googleapis");
const { OAuth2 } = google.auth;

const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;

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

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      name,
      email,
      password: hashedPassword,
    };
    const activation_token = createActivationToken(newUser);

    const url = `${CLIENT_URL}/user/activate/${activation_token}`;
    sendMail(email, url, "Verify your email address");

    res.json({ msg: "Register Success! Please activate your email to start." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
const activateEmail = async (req, res) => {
  try {
    const { activation_token } = req.body;
    const user = jwt.verify(activation_token, JWT_SECRET);

    const { name, email, password } = user;
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ msg: "This email already exists." });
    const newUser = await UserModel.create({
      name,
      email,
      password,
      admin,
      cart: [],
      addresses: [],
    });

    await newUser.save();

    res.json({ msg: "Account has been activated!" });
  } catch (err) {
    console.log(err);
  }
};
const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const savedUser = await UserModel.findOne({ email });
    if (!savedUser) {
      return res.status(400).json({ error: "Your email is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, savedUser.password);
    if (!isPasswordValid)
      return res.status(400).json({ msg: "Password is incorrect." });

    const refresh_token = createRefreshToken({ id: savedUser._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/user/refresh_token",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({ msg: "Login success!", refresh_token });
  } catch (err) {
    console.log(err);
  }
};
const getAccessToken = async (req, res) => {
  try {
    const rf_token = req.cookies.refreshtoken;
    if (!rf_token) return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(rf_token, JWT_SECRET, (err, user) => {
      if (err) return res.status(400).json({ msg: "Please login now!" });

      const access_token = createAccessToken({ id: user.id });
      res.json({ access_token });
    });
  } catch (err) {
    console.log(err);
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user)
      return res.status(400).json({ msg: "This email does not exist." });

    const access_token = createAccessToken({ id: user._id });
    const url = `${CLIENT_URL}/user/reset/${access_token}`;

    sendMail(email, url, "Reset your password");
    res.json({ msg: "Re-send the password, please check your email." });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {
  try {
    const { password } = req.body;
    console.log(password);
    const passwordHash = await bcrypt.hash(password, 12);

    await UserModel.findOneAndUpdate(
      { _id: req.user.id },
      {
        password: passwordHash,
      }
    );

    res.json({ msg: "Password successfully changed!" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken", { path: "/user/refresh_token" });
    return res.json({ msg: "Logged out." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const isLoggedIn = async (req, res) => {
  const token = req.cookies.access_token;
  if (!token) {
    return res.json(false);
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(400).json({ msg: "Please Login or Register" });

    const accesstoken = createAccessToken({ id: user.id });

    res.json({ accesstoken });
  });

  // return jwt.verify(token, JWT_SECRET, (err) => {
  //   if (err) {
  //     return res.json(false);
  //   }
  //   return res.json(true);
  // });
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

const getUserInfo = async (req, res) => {
  try {
    const userItems = await UserModel.findById(req.user).populate(
      "cart.productId",
      "_id name images price"
    );
    res.status(200).json({ userItems });
  } catch (err) {
    console.log();
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

const googleLogin = async (req, res) => {
  try {
  } catch (err) {
    console.log(err);
  }
};

// Token
const createActivationToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "15m" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};
module.exports = {
  signUp,
  signIn,
  isLoggedIn,
  logout,
  getAllUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserInfo,
  addAdress,
  getMyAdresses,
  deleteAddress,
  googleLogin,
  activateEmail,
  getAccessToken,
  forgotPassword,
  resetPassword,
};
