const UserModel = require("../models/UserModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { google } = require("googleapis");
const { sendEmail } = require("../utils/sendEmail");
const { OAuth2 } = google.auth;

const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;

const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Please add all the feilds!!!" });
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
      "cart.productId favorites.productId",
      "_id name price images discount inStock numOfReviews reviews ratings"
    );
    if (!savedUser) {
      return res.status(400).json({ err: "Your email is incorrect" });
    }
    const isPasswordValid = await bcrypt.compare(password, savedUser.password);
    if (!isPasswordValid)
      return res.status(400).json({ err: "Password is incorrect." });

    const refreshtoken = createRefreshToken({ id: savedUser._id });
    const access_token = createAccessToken({ id: savedUser._id });
    if (savedUser.admin) {
      res.cookie("admintoken", refreshtoken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 72 * 60 * 60 * 1000,
      });
    } else {
      res.cookie("refreshtoken", refreshtoken, {
        httpOnly: true,
        secure: true,
        sameSite: "None",
        maxAge: 72 * 60 * 60 * 1000,
      });
    }

    res.status(200).json({
      msg: "Login success!",
      access_token,
      user: {
        ...savedUser._doc,
      },
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const getAccessToken = async (req, res) => {
  try {
    const cookie = req.cookies;
    if (!cookie?.refreshtoken) throw new Error("No Refresh Token in Cookies");
    const refreshToken = cookie.refreshtoken;
    if (!refreshToken)
      return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(refreshToken, JWT_SECRET, async (err, client) => {
      if (err) return res.status(400).json({ msg: "Please login now." });

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

const getAccessAdminToken = async (req, res) => {
  try {
    const refreshToken = await req.cookies.admintoken;
    if (!refreshToken)
      return res.status(400).json({ msg: "Please login now!" });

    jwt.verify(refreshToken, JWT_SECRET, async (err, client) => {
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

const logout = async (req, res) => {
  try {
    res.clearCookie("refreshtoken");
    return res.json({ msg: "Sign out" });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const logoutAdmin = async (req, res) => {
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
  signIn,
  logout,
  googleOauth,
  activateEmail,
  getAccessToken,
  forgotPassword,
  resetPassword,
  getAccessAdminToken,
  logoutAdmin,
};
