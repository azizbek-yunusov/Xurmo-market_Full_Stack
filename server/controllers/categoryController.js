const CategoryModel = require("../models/CategoryModel");
const cloudinary = require("../utils/cloudinary");

const getAllCategoris = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate(
      "createdBy",
      "_id name avatar email"
    );
    res.status(201).json(categories);
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
    res.status(201).json(category);
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req, res) => {
  const { nameUz, nameEn, nameRu, slug, image, createdAt } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Categories",
    });
    const category = await CategoryModel.create({
      nameUz,
      nameEn,
      nameRu,
      slug,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createdAt,
      createdBy: req.user.id,
    });
    await category.save();
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
  }
};

const updateCategory = async (req, res) => {
  try {
    const { nameUz, nameEn, slug, nameRu, image } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, {
      nameUz,
      nameEn,
      nameRu,
      slug,
      image,
    });
    res.status(200).json(category);
  } catch (err) {
    console.log(err);
  }
};

const deleteCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(201).json(category);
  } catch (err) {
    console.log(err);
  }
};

const deleteSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    await selected.forEach((id) => {
      CategoryModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Deleted");
        }
      });
    });
    res.status(200).json({ msg: "successfully" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllCategoris,
  getCategory,
  createCategory,
  updateCategory,
  deleteSelected,
  deleteCategory,
};
