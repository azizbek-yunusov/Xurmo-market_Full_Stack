const BrandModel = require("../models/BrandModel");
const ProductModel = require("../models/ProductModel");
const cloudinary = require("../utils/cloudinary");

const createBrand = async (req, res) => {
  const { name, slug, image, createdAt } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Brands",
    });
    if (!name || !slug || !image) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    const brand = await BrandModel.create({
      name,
      slug,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      createdAt,
      createdBy: req.user.id,
    });
    await brand.save();
    res.status(200).json(brand);
  } catch (err) {
    console.log(err);
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find().populate("createdBy", "_id name");
    res.status(201).json(brands);
  } catch (err) {
    console.log(err);
  }
};

const getBrand = async (req, res) => {
  try {
    const brand = await BrandModel.findById(req.params.id);
    res.status(201).json(brand);
  } catch (err) {
    console.log(err);
  }
};

const updateBrand = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const brand = await BrandModel.findByIdAndUpdate(req.params.id, {
      name,
      slug,
    });
    res.status(200).json(brand);
  } catch (err) {
    console.log(err);
  }
};

const deleteSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    selected.forEach((id) => {
      BrandModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Brands Deleted");
        }
      });
    });
    res.status(200).json(selected);
  } catch (err) {
    console.log(err);
  }
};

const deleteBrand = async (req, res) => {
  try {
    const brand = await BrandModel.findByIdAndDelete(req.params.id);
    res.status(201).json(brand);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  createBrand,
  getAllBrands,
  getBrand,
  updateBrand,
  deleteBrand,
  deleteSelected,
};
