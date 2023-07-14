const BrandModel = require("../models/BrandModel");
const cloudinary = require("../utils/cloudinary");
const { createSlug } = require("../utils/createSlug");

const createBrand = async (req, res) => {
  const { name, image, activated } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Brands",
    });
    if (!name || !image) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    let slug = createSlug(name);
    const brand = await BrandModel.create({
      name,
      slug,
      image: {
        public_id: result.public_id,
        url: result.secure_url,
      },
      activated,
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
    const brands = await BrandModel.find().sort({ createdAt: -1 }).populate(
      "createdBy",
      "_id avatar lastName firstName userName"
    );
    res.status(201).json(brands);
  } catch (err) {
    console.log(err);
  }
};

const getBrand = async (req, res) => {
  try {
    const brand = await BrandModel.findById(req.params.id).populate(
      "createdBy",
      "_id avatar lastName firstName userName"
    );
    res.status(201).json(brand);
  } catch (err) {
    console.log(err);
  }
};

const updateBrand = async (req, res) => {
  try {
    const { name } = req.body;
    let slug = createSlug(name);
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
