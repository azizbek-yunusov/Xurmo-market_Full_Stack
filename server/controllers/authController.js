const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const cloudinary = require("../utils/cloudinary");
const { sendEmail } = require("../utils/sendEmail");
const { OAuth2 } = google.auth;

const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
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
    const activationtoken = createActivationToken(newUser);

    const url = `${CLIENT_URL}/user/activate/${activationtoken}`;
    sendEmail(email, url, "Verify your email address");

    res
      .status(200)
      .json({ msg: "Register Success! Please activate your email to start." });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const activateEmail = async (req, res) => {
  try {
    const { activationtoken } = req.body;
    const user = jwt.verify(activationtoken, JWT_SECRET);

    const { name, email, password } = user;
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      return res.status(400).json({ msg: "This email already exists." });
    const newUser = await UserModel.create({
      name,
      email,
      password,
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
    if (!email || !password) {
      return res.status(400).json({ err: "All fields are required" });
    }
    const savedUser = await UserModel.findOne({ email }).populate(
      "cart.productId",
      "_id name images price"
    );
    if (!savedUser) {
      return res.status(400).json({ err: "Your email is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, savedUser.password);
    if (!isPasswordValid)
      return res.status(400).json({ err: "Password is incorrect." });

    const refreshtoken = createRefreshToken({ id: savedUser._id });
    const access_token = createAccessToken({ id: savedUser._id });
    res.cookie("refreshtoken", refreshtoken, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      msg: "Login success!",
      access_token,
      user: {
        ...savedUser._doc,
      },
    });
  } catch (err) {
    // return res.status(500).json({ msg: err.message });
    console.log(err);
  }
};

const getAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshtoken;
    if (!refreshToken)
      return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(refreshToken, JWT_SECRET, async (err, client) => {
      if (err) return res.status(400).json({ msg: "Please login now." });

      const user = await UserModel.findById(client.id)
        .select("-password")
        .populate("cart.productId", "_id name images price");
      if (!user) return res.status(400).json({ msg: "This does not exist." });
      const access_token = createAccessToken({ id: client.id });

      res.json({
        access_token,
        user,
      });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
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
    res.clearCookie("refreshtoken", { path: "/" });
    return res.json({ msg: "Logged out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
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
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1h" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};
module.exports = {
  signUp,
  signIn,
  logout,
  googleLogin,
  activateEmail,
  getAccessToken,
  forgotPassword,
  resetPassword,
};
