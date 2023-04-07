const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const { sendMail } = require("../utils/sendEmailOTP");
const { OAuth2 } = google.auth;

const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;

function generateOTP() {
  let otp = "";
  for (let i = 0; i < 4; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
}

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please add all the feilds!!!" });
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
    await sendMail(email, "Verify your account", `Your OTP is ${otp}`);

    await newUser.save();
    res.status(200).json({
      msg: "Register Success! Please activate your email to start.",
      user: newUser,
    });
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
    const refresh_token = createRefreshToken({ id: savedUser._id });
    const access_token = createAccessToken({ id: savedUser._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.json({
      msg: "Login success!",
      access_token,
      refresh_token,
      user: {
        ...savedUser._doc,
      },
    });
    res.json({ msg: "Account has been activated!" });
  } catch (err) {
    console.log(err);
  }
};
const verifyOtp = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await UserModel.findOne({ otp });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    if (user.otp !== otp || user.otpExpiry < Date.now()) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid OTP or has been Expired" });
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
    console.log(err);
  }
};

const signInClient = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ err: "All fields are required" });
    }
    const client = await UserModel.findOne({ email }).populate(
      "cart.productId favorites.productId",
      "_id name price images discount inStock numOfReviews reviews ratings"
    );
    if (!client) {
      return res.status(400).json({ err: "Your email is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, client.password);
    if (!isPasswordValid)
      return res.status(400).json({ err: "Password is incorrect." });

    const refresh_token = createRefreshToken({ id: client._id });
    const access_token = createAccessToken({ id: client._id });

    res.cookie("refreshtoken", refresh_token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      msg: "Login success!",
      access_token,
      refresh_token,
      user: {
        ...client._doc,
      },
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

      const user = await UserModel.findById(client.id)
        .select("-password")
        .populate(
          "cart.productId favorites.productId",
          "_id name price images discount inStock numOfReviews reviews ratings"
        );
      if (!user) return res.status(400).json({ msg: "This does not exist." });
      const access_token = createAccessToken({ id: client.id });

      res.status(200).json({
        msg: "success!",
        access_token,
        user: user,
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
        user: user,
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
    const { tokenId } = req.body;

    const verify = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.MAILING_SERVICE_CLIENT_ID,
    });

    const { email_verified, email, name, picture } = verify.payload;

    const password = email + process.env.GOOGLE_SECRET;

    const passwordHash = await bcrypt.hash(password, 12);

    if (!email_verified)
      return res.status(400).json({ msg: "Email verification failed." });

    const user = await UserModel.findOne({ email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ msg: "Password is incorrect." });

      const refresh_token = createRefreshToken({ id: user._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!" });
    } else {
      const newUser = new UserModel({
        name,
        email,
        password: passwordHash,
        avatar: picture,
      });

      await newUser.save();

      const refresh_token = createRefreshToken({ id: newUser._id });
      res.cookie("refreshtoken", refresh_token, {
        httpOnly: true,
        path: "/user/refresh_token",
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      });

      res.json({ msg: "Login success!" });
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
  activateEmail,
  getAccessToken,
  forgotPassword,
  resetPassword,
  getAccessAdminToken,
  verifyOtp,
};
