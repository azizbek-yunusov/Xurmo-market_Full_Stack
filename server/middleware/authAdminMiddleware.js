const UserModel = require("../models/UserModel");

module.exports = async (req, res, next) => {
  try {
    // Get user information by id
    const user = await UserModel.findOne({ _id: req.user._id });
    console.log(user);
    if (!user.admin) {
      return res.status(400).json({ msg: "Admin resources access denied" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
