const ProductModel = require("../models/ProductModel");
const cloudinary = require("../utils/cloudinary");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .populate("createdBy", "_id name")
      .populate("category", "_id name");

    res.status(201).json(products);
  } catch (err) {
    console.log(err);
  }
};

const getbestProducts = async (req, res) => {
  try {
    const allProducts = await ProductModel.find().populate(
      "createdBy",
      "_id name"
    );
    const products = allProducts.filter((item) => {
      return item.ratings > 3.5;
    });
    res.status(201).json(products);
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
      .populate("createdBy", "_id name avatar")
      .populate("reviews.user", "_id name avatar");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (req, res) => {
  try {
    let images = [...req.body.images];
    let imagesBuffer = [];

    for (let i = 0; i < images.length; i++) {
      const result = await cloudinary.uploader.upload(images[i], {
        folder: "products",
      });

      imagesBuffer.push({
        public_id: result.public_id,
        url: result.secure_url,
      });
    }

    req.body.images = imagesBuffer;
    req.body.createdBy = req.user.id;

    const product = await ProductModel.create(req.body);
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, descr, brand, discount, inStock, category, isShow } =
      req.body;
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        descr,
        brand,
        discount,
        inStock,
        category,
        isShow,
      },
      {
        new: true,
      }
    );

    res.status(200).json(product);
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (!product) {
    return res.status(401).json({ msg: "Product not found" });
  }
  for (let i = 0; i < product.images.length; i++) {
    await cloudinary.uploader.destroy(product.images[i].public_id);
  }
  await product.remove();
  res.status(201).json(product);
};

const deleteSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    selected.forEach((id) => {
      ProductModel.deleteOne({ _id: id }, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log("Mahsulot o'chirildi");
        }
      });
    });
    res.status(200).json({ msg: "successfully" });
  } catch (err) {
    console.log(err);
  }
};

const PAGE_SIZE = 3;
const getSearch = async (req, res) => {
  try {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const brand = query.brand || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const searchQuery = query.query || "";
    const order = query.order || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? {
            name: {
              $regex: searchQuery,
              $options: "i",
            },
          }
        : {};

    const categoryFilter = category && category !== "all" ? { category } : {};
    const brandFilter = brand && brand !== "all" ? { brand } : {};

    const ratingFilter =
      rating && rating !== "all"
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};

    const priceFilter =
      price && price !== "all"
        ? {
            // 1-50
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { _id: -1 };

    const products = await ProductModel.find({
      ...queryFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    })
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await ProductModel.countDocuments({
      ...queryFilter,
      ...categoryFilter,
      ...brandFilter,
      ...priceFilter,
      ...ratingFilter,
    });
    res.status(200).json({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  getAllProducts,
  getbestProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteSelected,
  getSearch,
};
