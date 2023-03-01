const UserModel = require("../models/UserModel");
const cloudinary = require("../utils/cloudinary");
const ProductModel = require("../models/ProductModel");

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
        "cart.productId favorites.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );
    res.status(200).json(user);
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
        "cart.productId favorites.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );
    res.status(200).json(user);
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
        "cart.productId favorites.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const addToFavorite = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(500).json({ msg: "Product not found" });
    }
    let client = await UserModel.findById(req.user.id);
    await client.newFavorite(product);
    const user = await UserModel.findById(req.user.id)
      .select("-password")
      .populate(
        "cart.productId favorites.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );
    res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const deleteFavoriteItem = async (req, res) => {
  try {
    let client = await UserModel.findById(req.user.id);
    await client.removeFromFavorite(req.params.id);
    const user = await UserModel.findById(req.user.id)
      .select("-password")
      .populate(
        "cart.productId favorites.productId",
        "_id name price images discount inStock numOfReviews reviews ratings"
      );
    res.status(200).json(user);
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

// Admin Only
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
      "cart.productId favorites.productId",
      "_id name price images discount inStock numOfReviews reviews ratings"
    );
    if (!user) {
      res.status(404).json({ message: "User Not Found" });
    } else {
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
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

      const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
        folder: "avatars",
        crop: "scale",
      });

      newUserData.avatar = {
        public_id: myCloud.public_id,
        url: myCloud.secure_url,
      };
    } else {
      const myCloud = await cloudinary.uploader.upload(req.body.avatar, {
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

const deleteUser = async (req, res) => {
  await UserModel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    msg: "DELETED USER",
  });
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
  addToCart,
  deleteCartItems,
  decrementQtyItem,
  addToFavorite,
  deleteFavoriteItem,
  getAllUsers,
  getUser,
  updateUser,
  updateProfile,
  uploadAvatar,
  deleteUser,
  deleteSelected,
  getUserInfo,
  addAdress,
  getMyAdresses,
  deleteAddress,
};
