const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");
const { google } = require("googleapis");
const cloudinary = require("../utils/cloudinary");
const { OAuth2 } = google.auth;

const JWT_SECRET = process.env.JWT_SECRET;
const client = new OAuth2(process.env.MAILING_SERVICE_CLIENT_ID);
const { CLIENT_URL } = process.env;

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
    const userItems = await UserModel.findById(req.user.id).populate(
      "cart.productId",
      "_id name images price"
    );
    res.status(200).json(userItems);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const newUserData = {
      name: req.body.name,
      lastName: req.body.lastName,
      // phoneNumber: req.body.phoneNumber,
    };
    if (req.body.avatar !== "") {
      const user = await UserModel.findById(req.user.id);

      const imageId = user.avatar.public_id;

      await cloudinary.v2.uploader.destroy(imageId);

      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else {
      const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "avatars",
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    }
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.user.id,
      newUserData,
      {
        new: true,
      }
    );
    res.status(200).json({
      updatedUser,
    });
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
    const updatedAvatar = await UserModel.findByIdAndUpdate(
      req.user.id,
      newUserAvatar,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json({
      updatedAvatar,
    });
  } catch (err) {
    console.log(err);
  }
};
const updateUser = async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.admin = req.body.admin || user.admin;
      const updatedUser = await user.save();
      res.json({
        name: updatedUser.name,
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
    const user = await UserModel.findById(req.user.id);
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
    const user = await UserModel.findById(req.user.id);
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
    const user = await UserModel.findById(req.user.id);
    await user.removeFromAddress(req.params.id);
    res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  updateUser,
  updateProfile,
  uploadAvatar,
  deleteUser,
  getUserInfo,
  addAdress,
  getMyAdresses,
  deleteAddress,
};
