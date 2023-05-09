const UserModel = require("../models/UserModel");
const cloudinary = require("../utils/cloudinary");
const ProductModel = require("../models/ProductModel");
const bcrypt = require("bcryptjs");

// User me
const addToCart = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ msg: "Product not found" });
    }
    let client = await UserModel.findById(req.user.id);
    await client.addToCart(product);
    const user = await UserModel.findById(req.user.id)
      .select("-password")
      .populate(
        "cart.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );
    res.status(200).json(user.cart);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteCartItems = async (req, res) => {
  try {
    let client = await UserModel.findById(req.user.id);
    await client.removeFromCart(req.params.id);
    const user = await UserModel.findById(req.user.id)
      .select("-password")
      .populate(
        "cart.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );
    res.status(200).json(user.cart);
  } catch (err) {
    console.log(err);
  }
};

const decrementQtyItem = async (req, res) => {
  try {
    let client = await UserModel.findById(req.user.id);
    await client.decrementQty(req.params.id);
    const user = await UserModel.findById(req.user.id)
      .select("-password")
      .populate(
        "cart.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );
    res.status(200).json(user.cart);
  } catch (err) {
    console.log(err);
  }
};

const getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id).populate(
      "cart.productId favorites.productId",
      "_id name price images discount inStock numOfReviews reviews ratings"
    );
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
    };

    const user = await UserModel.findByIdAndUpdate(req.user.id, userData, {
      new: true,
    }).populate(
      "cart.productId favorites.productId",
      "_id name price images discount inStock numOfReviews reviews ratings"
    );
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword, conNewPassword } = req.body;
    if (!oldPassword || !newPassword || !conNewPassword) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    const user = await UserModel.findById(req.user.id).populate(
      "cart.productId favorites.productId",
      "_id name price images discount inStock numOfReviews reviews ratings"
    );

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    if (newPassword !== conNewPassword)
      return res.status(400).send("Passwords do not match");

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    let newUserAvatar = {};
    if (req.body.avatar !== "") {
      const currentAvatar = await UserModel.findById(req.user.id).populate(
        "cart.productId favorites.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );

      const ImgId = currentAvatar.avatar.public_id;

      if (ImgId) {
        await cloudinary.uploader.destroy(ImgId);
      }

      const newAvatar = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "Avatars",
      });

      newUserAvatar.avatar = {
        public_id: newAvatar.public_id,
        url: newAvatar.secure_url,
      };
    }
    const user = await UserModel.findByIdAndUpdate(req.user.id, newUserAvatar, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

// Admin Only
const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};

const getUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
};

const createUser = async (req, res) => {
  try {
    const { name, lastName, email, phoneNumber, password, avatar, admin } =
      req.body;
    if (!name || !email || !password || !avatar) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    const userExists = await UserModel.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: "This email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await cloudinary.uploader.upload(avatar, {
      folder: "Avatar",
    });
    const user = await UserModel.create({
      name,
      lastName,
      phoneNumber,
      email,
      password: hashedPassword,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      admin,
    });
    await user.save();
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = {
      name: req.body.name,
      lastName: req.body.lastName,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      admin: req.body.admin,
    };
    const user = await UserModel.findByIdAndUpdate(req.body.id);
    await UserModel.findByIdAndUpdate(user._id, userData, {
      new: true,
    });

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    }
    res.status(201).json(user);
  } catch (err) {
    console.log(err);
  }
};

const deleteSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    selected.forEach((id) => {
      UserModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Foydalanuvchilar o'chirildi");
        }
      });
    });
    res.status(200).json({ msg: "successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  addToCart,
  deleteCartItems,
  decrementQtyItem,
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  updateProfile,
  uploadAvatar,
  deleteUser,
  deleteSelected,
  getUserInfo,
  changePassword,
};
