const AdminModel = require("../models/AdminModel");
const cloudinary = require("../utils/cloudinary");
const bcrypt = require("bcryptjs");

// User me
const getAdminInfo = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.user.id);
    res.status(200).json(admin);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const adminData = {
      name: req.body.name,
      lastName: req.body.lastName,
      userName: req.body.userName,
      phoneNumber: req.body.phoneNumber,
    };

    const user = await AdminModel.findByIdAndUpdate(req.user.id, adminData, {
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
    const user = await AdminModel.findById(req.user.id);

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
      const currentAvatar = await AdminModel.findById(req.user.id);

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
    const admin = await AdminModel.findByIdAndUpdate(
      req.user.id,
      newUserAvatar,
      {
        new: true,
        runValidators: true,
        useFindAndModify: false,
      }
    );
    res.status(200).json(admin);
  } catch (err) {
    console.log(err);
  }
};

// Admin Only
const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminModel.find({ role: "admin" });
    res.status(200).json(admins);
  } catch (err) {
    console.log(err);
  }
};

const getAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.findById(req.params.id);
    if (!admin) {
      return res.status(404).json({ message: "Admin Not Found" });
    } else {
      res.status(200).json(admin);
    }
  } catch (err) {
    return res.status(500).json({ err });
  }
};

const addAdmin = async (req, res) => {
  try {
    const { firstName, lastName, userName, phone, password, avatar, status } =
      req.body;
    if ((!firstName, !lastName || !userName || !password || !phone)) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    console.log(req.body);
    const adminExists = await AdminModel.findOne({ userName });
    if (adminExists) {
      return res.status(400).json({ error: "This userName already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await cloudinary.uploader.upload(avatar, {
      folder: "Avatar",
    });
    const admin = await AdminModel.create({
      firstName,
      lastName,
      phone,
      userName,
      status,
      avatar: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      password: hashedPassword,
    });
    await admin.save();
    res.status(200).json({ msg: "success", admin });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

const updateAdmin = async (req, res) => {
  try {
    const adminData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      userName: req.body.userName,
      phone: req.body.phone,
      status: req.body.status,
    };
    const admin = await AdminModel.findByIdAndUpdate(req.body.id);
    await AdminModel.findByIdAndUpdate(user._id, adminData, {
      new: true,
    });

    res.status(200).json({ msg: "Success", admin });
  } catch (err) {
    console.log(err);
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await AdminModel.findByIdAndDelete(req.params.id);
    if (!admin) {
      res.status(404).json({ message: "admin Not Found" });
    }
    res.status(201).json(admin);
  } catch (err) {
    console.log(err);
  }
};

const deleteSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    selected.forEach((id) => {
      AdminModel.deleteOne({ _id: id }, (err) => {
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
  getAllAdmins,
  getAdmin,
  addAdmin,
  updateAdmin,
  updateProfile,
  uploadAvatar,
  deleteAdmin,
  deleteSelected,
  getAdminInfo,
  changePassword,
};
