const UserModel = require("../models/UserModel");
const cloudinary = require("../utils/cloudinary");
const ProductModel = require("../models/ProductModel");
const bcrypt = require("bcryptjs");

// User me
const getUserInfo = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);
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
    });
    res.status(200).json({ msg: "Profile updated", user });
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
    const user = await UserModel.findById(req.user.id);

    const validPassword = await bcrypt.compare(oldPassword, user.password);
    if (!validPassword) return res.status(400).send("Invalid password");

    if (newPassword !== conNewPassword)
      return res.status(400).send("Passwords do not match");

    const salt = await bcrypt.genSalt(10);
    const hashedNewPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedNewPassword;
    await user.save();

    res.status(200).json({ msg: "Password updated", user });
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const uploadAvatar = async (req, res) => {
  try {
    let newUserAvatar = {};
    if (req.body.avatar !== "") {
      const currentAvatar = await UserModel.findById(req.user.id);

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
    const users = await UserModel.find().sort({ createdAt: -1 });
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
    const { name, lastName, email, phoneNumber, password, avatar, status } =
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
      status,
      password: hashedPassword,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
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
      status: req.body.status,
    };
    await UserModel.findByIdAndUpdate(req.params.id, userData, {
      new: true,
    });
    const user = await UserModel.findByIdAndUpdate(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    // await cloudinary.uploader.destroy(user.avatar.public_id);
    // await user.remove();

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
          console.log("User deleted");
        }
      });
    });
    res.status(200).json({ msg: "successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
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
