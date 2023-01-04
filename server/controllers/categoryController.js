const CategoryModel = require("../models/CategoryModel");

const getAllCategoris = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate(
      "createdBy",
      "_id name"
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
      "_id name"
    );
    res.status(201).json({ category });
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req, res) => {
  const { _id, name, slug, image, createdAt } = req.body;
  if (!name || !slug || !image) {
    return res.status(400).json({ error: "Please add all the feilds" });
  }
  const category = await CategoryModel.create({
    _id,
    name,
    slug,
    image,
    createdAt,
    createdBy: req.user.id,
  });
  try {
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
