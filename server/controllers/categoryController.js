const CategoryModel = require("../models/CategoryModel");
const cloudinary = require("../utils/cloudinary");

const getAllCategoris = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate(
      "createdBy",
      "_id name avatar email"
    );
    res.status(201).json({
      categories,
    });
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findById(req.params.id).populate(
      "createdBy",
      "_id name avatar email"
    );
    res.status(201).json({ category });
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req, res) => {
  const { _id, name, slug, image, banner, createdAt } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Categories",
    });
    const resultBanner = await cloudinary.uploader.upload(banner, {
      folder: "Banners",
    });
    const category = await CategoryModel.create({
      _id,
      name,
      slug,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      banner: {
        public_id: resultBanner.public_id,
        url: resultBanner.secure_url,
      },
      createdAt,
      createdBy: req.user.id,
    });
    await category.save();
    res.status(200).json({
      category,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name, slug, image } = req.body;
    const updatedBanner = await CategoryModel.findByIdAndUpdate(req.params.id, {
      name,
      slug,
      image,
    });
    res.status(200).json({ updatedBanner });
  } catch (err) {
    console.log(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      msg: "DELETED",
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAllCategoris,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
};
