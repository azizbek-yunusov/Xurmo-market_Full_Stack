const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const axios = require("axios");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../utils/sendEmail");
const FavoriteProductModel = require("../models/FavoriteProductModel");
const CartModel = require("../models/CartModel");

const { CLIENT_URL, GOOGLE_OAUTH, GOOGLE_SECRET, JWT_SECRET } = process.env;

function generateOTP() {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

const signUp = async (req, res) => {
  try {
    const { name, email, password, confirmPass } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please add all the feilds!!!" });
    }
    if (password !== confirmPass) {
      return res.status(400).json({ error: "Passwords do not match" });
    }
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // generation OTP
    const otp = generateOTP();

    const newUser = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otp_expiry: new Date(Date.now() + process.env.OTP_EXPIRE * 60 * 1000),
    });
    await sendMail(
      email,
      "Tasdiqlash kodi (OTP)",
      `Assalomu alaykum,\n\nSizning ro'yhatdan o'tish uchun tasdiqlash kodi (OTP) talab qilindi. Kodingiz quyida keltirilgan:\n\nTasdiqlash kodi: ${otp}\n\nBu kodni saytga kirish uchun foydalaning.\n\nTashakkur,\n\n[Xurmo.uz]`
    );

    await newUser.save();

    const refresh_token = createRefreshToken({ id: newUser._id });
    const access_token = createAccessToken({ id: newUser._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      user: {
        ...newUser._doc,
      },
      msg: "Enter the verification code (OTP)",
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await UserModel.findOne({ otp });
    if (!user) {
      return res.status(400).json({ err: "User not found" });
    }
    console.log(user.otp, "===", otp);
    if (user.otp !== otp) {
      return res.status(400).json({ success: false, err: "Invalid OTP code" });
    }
    if (user.otpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, err: "Invalid OTP has been Expired" });
    }

    user.verified = true;
    user.otp = null;
    user.otpExpiry = null;

    await user.save();
    const refresh_token = createRefreshToken({ id: user._id });
    const access_token = createAccessToken({ id: user._id });

    res.status(200).json({
      msg: "Verified!!!",
      access_token,
      refresh_token,
      user: {
        ...user._doc,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const signInClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: "All fields are required" });
    }
    const client = await UserModel.findOne({ email });
    if (!client) {
      return res.status(400).json({ err: "Your email is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid)
      return res.status(400).json({ err: "Password is incorrect." });

    const refresh_token = createRefreshToken({ id: client._id });
    const access_token = createAccessToken({ id: client._id });

    const cart = await CartModel.findOne({ user: client._id }).populate(
      "products.productId",
      "_id name price images discount inStock numOfReviews ratings"
    );
    const favorite = await FavoriteProductModel.findOne({
      user: client._id,
    }).populate(
      "products",
      "_id name price images discount inStock numOfReviews ratings"
    );
    res.status(200).json({
      msg: "Login success!",
      access_token,
      refresh_token,
      user: {
        ...client._doc,
      },
      cart: cart?.products || [],
      favorites: favorite?.products || [],
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAccessToken = async (req, res) => {
  try {
    const { refresh_token } = req.body;
    // const refreshToken = await req.cookies.refreshtoken;
    if (!refresh_token)
      return res.status(401).json({ msg: "Please login now!" });

    jwt.verify(refresh_token, JWT_SECRET, async (err, client) => {
      if (err) return res.status(401).json({ msg: "Please login now." });

      const user = await UserModel.findById(client.id).select("-password");
      if (!user) return res.status(400).json({ msg: "This does not exist." });
      const access_token = createAccessToken({ id: client.id });
      const cart = await CartModel.findOne({ user }).populate(
        "products.productId",
        "_id name price images discount inStock numOfReviews ratings"
      );
      const favorite = await FavoriteProductModel.findOne({
        user,
      }).populate(
        "products",
        "_id name price images discount inStock numOfReviews ratings"
      );
      res.status(200).json({
        msg: "success!",
        access_token,
        user,
        cart: cart?.products || [],
        favorites: favorite?.products || [],
      });
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const signInAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: "All fields are required" });
    }
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ err: "Email is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid)
      return res.status(400).json({ err: "Password is incorrect." });

    const refresh_token = createRefreshToken({ id: user._id });
    const access_token = createAccessToken({ id: user._id });

    if (user.admin) {
      res.cookie("admintoken", refresh_token, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
    } else {
      return res.status(500).json({ msg: "Admin resources access denied" });
    }

    res.status(200).json({
      msg: "Login success!",
      access_token,
      admin_token: refresh_token,
      user: {
        ...user._doc,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAccessAdminToken = async (req, res) => {
  try {
    // const refreshToken = await req.cookies.admintoken;
    const refresh_token = req.body.admin_token;
    if (!refresh_token)
      return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(refresh_token, JWT_SECRET, async (err, client) => {
      if (err) return res.status(400).json({ msg: "Please login now." });

      const user = await UserModel.findById(client.id).select("-password");

      if (!user) return res.status(400).json({ msg: "This does not exist." });
      const access_token = createAccessToken({ id: client.id });

      res.status(200).json({
        msg: "success!",
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
    return res.status(500).json({ msg: err.message });
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

const signOutClient = async (req, res) => {
  try {
    res.clearCookie("refreshtoken");
    return res.json({ msg: "Sign out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const signOutAdmin = async (req, res) => {
  try {
    res.clearCookie("admintoken");
    return res.json({ msg: "Sign out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const googleOauth = async (req, res) => {
  try {
    const { access_token } = req.body;
    if (!access_token) {
      return res.status(401).json({ err: "access_token required!!!" });
    }
    const response = await axios.get(GOOGLE_OAUTH, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (!response.data) {
      return res.status(401).json({ err: "Something Went Wrong!" });
    }
    const name = response.data.given_name;
    const lastName = response.data?.family_name;
    const email = response.data.email;
    const password = email + GOOGLE_SECRET;
    const picture = response.data.picture;
    const verified = response.data.email_verified;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const user = await UserModel.findOne({ email });
    if (user) {
      console.log(user);
      console.log();
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.status(400).json({ err: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      const access_token = createAccessToken({ id: user._id });
      res.status(200).json({
        msg: "Login success!",
        access_token,
        refresh_token,
        user: {
          ...user._doc,
        },
      });
    } else {
      const newUser = await UserModel.create({
        name,
        lastName,
        email,
        password: hashedPassword,
        avatar: {
          public_id: picture,
          url: picture,
        },
        verified,
      });
      await newUser.save();

      const refresh_token = createRefreshToken({ id: newUser._id });
      const access_token = createAccessToken({ id: newUser._id });
      res.status(200).json({
        msg: "Login success!",
        access_token,
        refresh_token,
        user: {
          ...newUser._doc,
        },
      });
    }
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

// Token
const createActivationToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "5m" });
};

const createAccessToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });
};

const createRefreshToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
};

module.exports = {
  signUp,
  signInClient,
  signInAdmin,
  signOutAdmin,
  signOutClient,
  googleOauth,
  getAccessToken,
  forgotPassword,
  resetPassword,
  getAccessAdminToken,
  verifyOtp,
};
