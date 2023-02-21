const BrandModel = require("../models/BrandModel");
const ProductModel = require("../models/ProductModel");
const cloudinary = require("../utils/cloudinary");

const createBrand = async (req, res) => {
  const { name, slug, image, createdAt } = req.body;
  try {
    const result = await cloudinary.uploader.upload(image, {
      folder: "Brands",
    });
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
    res.status(200).json({
      brand,
    });
  } catch (err) {
    console.log(err);
  }
};

const getAllBrands = async (req, res) => {
  try {
    const brands = await BrandModel.find().populate("createdBy", "_id name");
    res.status(201).json({
      brands,
    });
  } catch (err) {
    console.log(err);
  }
};

const getBrand = async (req, res) => {
  try {
    const brand = await BrandModel.findById(req.params.id);
    res.status(201).json({ brand });
  } catch (err) {
    console.log(err);
  }
};

const updateBrand = async (req, res) => {
  try {
    const currentProduct = await Product.findById(req.params.id);

    const data = {
      name: req.body.name,
      slug: req.body.slug,
    };

    if (req.body.image !== "") {
      const imgId = currentProduct.image.public_id;
      if (imgId) {
        await cloudinary.uploader.destroy(imgId);
      }

      const newImage = await cloudinary.uploader.upload(req.body.image, {
        folder: "Brands",
      });
      data.image = {
        public_id: newImage.public_id,
        url: newImage.secure_url,
      };
    }

    const productUpdated = await ProductModel.findOneAndUpdate(
      req.params.id,
      data,
      { new: true }
    );
    res.status(200).json({
      msg: "Updated Product",
      productUpdated,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteBrand = async (req, res) => {
  try {
    await BrandModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      msg: "DELETED",
    });
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
};
