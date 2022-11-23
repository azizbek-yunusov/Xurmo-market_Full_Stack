const { Router } = require("express");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const ProductModel = require("../models/ProductModel");
const router = Router();

router.get("/products", async (req, res) => {
  const products = await ProductModel.find().populate("createdBy", "_id name");
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
  async (req, res) => {
    const { name, price, descr, image } = req.body;
    const updateProduct = await ProductModel.findByIdAndUpdate(req.params.id, {
      name,
      price,
      image,
      descr
    });
    res.status(200).json({ updateProduct });
  }
);
//
router.delete("/product/delete/:id", authMiddleware, async (req, res) => {
  await ProductModel.findByIdAndDelete(req.params.id)
  res.status(201).json({
    msg: "DELETED"
  })
})

module.exports = router;
