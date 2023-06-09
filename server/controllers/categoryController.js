const SubCategoryModel = require("../models/SubCategoryModel");
const CategoryModel = require("../models/CategoryModel");
const cloudinary = require("../utils/cloudinary");

const getAllCategoris = async (req, res) => {
  try {
    const categories = await CategoryModel.find().populate(
      "createdBy",
      "_id name lastName avatar email"
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
      "_id name lastName avatar email"
    );
    const subCategories = await SubCategoryModel.find({
      categoryId: category._id,
    });
    console.log(subCategories);
    res.status(201).json({ category, subCategories });
  } catch (err) {
    console.log(err);
  }
};

const getSlugCategory = async (req, res) => {
  try {
    const category = await CategoryModel.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ err: "Category not found!" });
    }
    const subCategories = await SubCategoryModel.find({
      categoryId: category._id,
    });

    res.status(200).json({ msg: "Success", category, subCategories });
  } catch (err) {
    console.log(err);
  }
};

const createCategory = async (req, res) => {
  const { nameOz, nameUz, nameRu, slug, image } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Categories",
    });
    const category = await CategoryModel.create({
      nameOz,
      nameUz,
      nameRu,
      slug,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
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
    const { nameOz, nameUz, slug, nameRu, image } = req.body;
    const category = await CategoryModel.findByIdAndUpdate(req.params.id, {
      nameOz,
      nameUz,
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
// Category Item

const getSubCategories = async (req, res) => {
  try {
    const subCategorys = await SubCategoryModel.find()
      .populate("createdBy", "_id name lastName avatar email")
      .populate("categoryId", "_id slug nameOz nameUz nameRu image");
    res.status(201).json(subCategorys);
  } catch (err) {
    console.log(err);
  }
};
const createSubCategory = async (req, res) => {
  const { categoryId, titleOz, titleUz, titleRu, image } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Categories",
    });
    const subCategory = await SubCategoryModel.create({
      categoryId,
      titleOz,
      titleUz,
      titleRu,
      slug: titleOz.toLowerCase().replace(/\s+/g, "-"),
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createdBy: req.user.id,
    });
    await subCategory.save();
    res.status(200).json(subCategory);
  } catch (err) {
    console.log(err);
  }
};

const deleteSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategoryModel.findByIdAndDelete(req.params.id);
    res.status(201).json(subCategory);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllCategoris,
  getCategory,
  createCategory,
  updateCategory,
  getSlugCategory,
  deleteSelected,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  deleteSubCategory,
};
