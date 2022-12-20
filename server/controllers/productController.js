const ProductModel = require("../models/ProductModel");

const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate(
      "createdBy",
      "_id name"
    );
    res.status(201).json({
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

const getbestProducts = async (req, res) => {
  try {
    const products = await ProductModel.find().populate(
      "createdBy",
      "_id name"
    );
    const bestProducts = products.filter((item) => {
      return item.ratings > 3.5;
    });
    res.status(201).json({
      bestProducts,
    });
  } catch (err) {
    console.log(err);
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await ProductModel.findById(req.params.id)
      .populate("createdBy", "_id name")
      .populate("reviews.user", "_id name");
    res.status(201).json({ product });
  } catch (err) {
    console.log(err);
  }
};

const createProduct = async (req, res) => {
  const { _id, name, descr, price, createdAt, category, images } = req.body;
  // Create product
  const product = await ProductModel.create({
    _id,
    name,
    descr,
    price,
    images,
    createdAt,
    category,
    createdBy: req.user,
  });
  try {
    await product.save();
    res.status(200).json({
      product,
    });
  } catch (err) {
    console.log(err);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { name, price, descr, image } = req.body;
    const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
      name,
      price,
      image,
      descr,
    });
    res.status(200).json({ updateProduct });
  } catch (err) {
    console.log(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    async (req, res) => {
      await ProductModel.findByIdAndDelete(req.params.id);
      res.status(201).json({
        msg: "DELETED",
      });
    };
  } catch (err) {
    console.log(err);
  }
};

const addReview = async (req, res) => {
  try {
    const { rating, comment, productId } = req.body;
    const review = {
      user: req.user._id,
      name: req.user,
      rating: Number(rating),
      comment,
    };

    const product = await ProductModel.findById(productId);

    const isReviewed = product.reviews.find(
      (rev) => rev.user.toString() === req.user._id.toString()
    );
    if (isReviewed) {
      product.reviews.forEach((rev) => {
        if (rev.user.toString() === req.user._id.toString())
          (rev.rating = rating), (rev.comment = comment);
      });
    } else {
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
      avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
      success: true,
      product,
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
  addReview,
};
