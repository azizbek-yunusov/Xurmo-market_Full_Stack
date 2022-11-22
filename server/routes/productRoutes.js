const { Router } = require("express");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const ProductModel = require("../models/ProductModel");
const router = Router();

router.get("/products", async (req, res) => {
  const products = await ProductModel.find();
  res.status(200).json({
    products,
  });
});

router.post(
  "/product/add",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    const { _id, name, descr, price, image, createdAt } = req.body;
    if (!name || !descr || !price || !image) {
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

module.exports = router;
