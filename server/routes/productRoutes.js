const { Router } = require("express");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const ProductModel = require("../models/ProductModel");
const router = Router();

router.get("/products", async (req, res) => {
  const products = await ProductModel.find().populate("createdBy", "_id name");
  res.status(201).json({
    products,
  });
});

router.get("/product/:id", async (req, res) => {
  const product = await ProductModel.findById(req.params.id)
    .populate("createdBy", "_id name")
    .populate("reviews.user", "_id name");
  res.status(201).json({ product });
});

router.post(
  "/product/create",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    const { _id, name, descr, price, image, createdAt, category } = req.body;
    if ((!name || !descr || !price || !image, !category)) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    // Create product
    const product = await ProductModel.create({
      _id,
      name,
      descr,
      price,
      image,
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
  }
);
// Update product
router.put(
  "/product/update/:id",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    try {
      const { name, price, descr, image } = req.body;
      const updateProduct = await ProductModel.findByIdAndUpdate(
        req.params.id,
        {
          name,
          price,
          image,
          descr,
        }
      );
      res.status(200).json({ updateProduct });
    } catch (err) {
      console.log(err);
    }
  }
);
//
router.delete(
  "/product/delete/:id",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    await ProductModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      msg: "DELETED",
    });
  }
);

router.put("/review", authMiddleware, async (req, res) => {
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
    product
  });
});

module.exports = router;
