const UserModel = require("../models/UserModel");

module.exports = async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ _id: req.user.id });
    if (!user.admin) {
      return res.status(400).json({ msg: "Admin resources access denied" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
