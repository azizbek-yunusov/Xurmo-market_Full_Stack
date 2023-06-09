const ProductModel = require("../models/ProductModel");
const ReviewModel = require("../models/ReviewModel");
const ApiFeatures = require("../utils/apiFeatures");
const cloudinary = require("../utils/cloudinary");
const { createSlug } = require("../utils/createSlug");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find()
      .sort({ createdAt: -1 })
      .populate("createdBy", "_id firstName lastName userName avatar")
      .populate("category", "_id nameOz nameUz nameRu")
      .populate("brand", "_id name");

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
    const product = await ProductModel.findById(req.params.id).populate(
      "createdBy",
      "_id name lastName email avatar"
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const reviews = await ReviewModel.find({
      productId: product._id,
      status: "verified",
    }).populate("user reply.user", "_id name lastName email avatar");

    res.status(201).json({
      msg: "Succuss",
      product,
      reviews,
    });
  } catch (err) {
    console.log(err);
  }
};

const getProductView = async (req, res) => {
  try {
    const product = await ProductModel.findOne({
      slug: req.params.slug,
    })
      .populate("category", "slug nameOz  nameUz nameRu")
      .populate("brand", "name");
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    const reviews = await ReviewModel.find({
      productId: product._id,
      isActive: true,
    }).populate("user reply.user", "_id name lastName email avatar");

    res.status(201).json({
      msg: "Succuss",
      product,
      reviews,
    });
  } catch (err) {
    console.log(err);
  }
};

const getSearchProducts = async (req, res) => {
  try {
    const resultPerPage = 8;
    const productsCount = await ProductModel.countDocuments();
    let query = req.query;
    console.log(query);
    const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
      .search()
      .filter();
    let products = await apiFeature.query.clone();
    let filteredProductsCount = products.length;
    apiFeature.pagination(resultPerPage);

    res.status(200).json({
      success: true,
      products,
      resultPerPage,
      filteredProductsCount,
      productsCount,
    });
  } catch (error) {
    console.log(error);
  }
};

// Admin only

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
    req.body.slug = createSlug(req.body.name);

    if (req.body.discount > 0) {
      req.body.oldPrice = req.body.price;
      req.body.price =
        req.body.price - (req.body.discount * req.body.price) / 100;
    }

    const product = await ProductModel.create(req.body);
    await product.save();
    console.log(product);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      descr,
      brand,
      discount,
      inStock,
      category,
      subCategory,
      isActive,
    } = req.body;

    if (req.body.discount > 0) {
      req.body.oldPrice = req.body.price;
      req.body.price =
        req.body.price - (req.body.discount * req.body.price) / 100;
    }
    const product = await ProductModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        price,
        descr,
        discount,
        inStock,
        brand,
        category,
        subCategory,
        isActive,
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
  try {
    const product = await ProductModel.findById(req.params.id);
    if (!product) {
      return res.status(401).json({ msg: "Product not found" });
    }
    // for (let i = 0; i < product.images.length; i++) {
    //   await cloudinary.uploader.destroy(product.images[i].public_id);
    // }
    // await product.remove();
    res.status(201).json(product);
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};

const discountSelected = async (req, res) => {
  try {
    let selected = [...req.body.selected];

    selected.forEach((productId) => {
      ProductModel.updateOne(
        { _id: productId },
        {
          discount: req.body.discount,
          discountExpire: req.body.expire,
        },
        {
          new: true,
        },
        (err) => {
          if (err) {
            console.log(err);
          } else {
            console.log("Successfully");
          }
        }
      );
    });
    res.status(200).json({ msg: "successfully" });
  } catch (err) {
    console.log(err);
  }
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

const PAGE_SIZE = 8;

const getSearchList = async (req, res) => {
  try {
    const resultPerPage = 8;
    const productsCount = await ProductModel.countDocuments();

    const apiFeature = new ApiFeatures(ProductModel.find(), req.query)
      .search()
      .filter();

    let products = await apiFeature.query;

    let filteredProductsCount = products.length;

    apiFeature.pagination(resultPerPage);

    products = await apiFeature.query;

    res.status(200).json({
      success: true,
      products,
      productsCount,
      resultPerPage,
      filteredProductsCount,
    });
  } catch (err) {
    console.log(err);
  }
};
const getSearch = async (req, res) => {
  try {
    const { query } = req;
    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const brand = query.brand || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const searchQuery = query.keyword || "";
    const order = query.order || "";

    const queryFilter = searchQuery
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};

    const categoryFilter = category ? { category } : {};
    const brandFilter = brand ? { brand } : {};

    const ratingFilter =
      rating && rating
        ? {
            rating: {
              $gte: Number(rating),
            },
          }
        : {};

    const priceFilter = price
      ? {
          // 1-50
          price: {
            $gte: Number(price.gte),
            $lte: Number(price.lte),
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
    });
    // .sort(sortOrder)
    // .skip(pageSize * (page - 1))
    // .limit(pageSize);

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
  getProductView,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
  deleteSelected,
  getSearch,
  discountSelected,
  getSearchList,
  getSearchProducts,
};
