const AdminModel = require("../models/AdminModel");

module.exports = async (req, res, next) => {
  try {
    const admin = await AdminModel.findOne({ _id: req.user.id });
    if (admin.role !== "owner") {
      return res.status(401).json({ msg: "Owner resources access denied" });
    }

    next();
  } catch (err) {
    return res.status(500).json({ err: err.message });
  }
};
