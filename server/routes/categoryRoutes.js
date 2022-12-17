const { Router } = require("express");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const CategoryModel = require("../models/CategoryModel");
const ProductModel = require("../models/ProductModel");
const router = Router();

router.get("/categories", async (req, res) => {
  const categories = await CategoryModel.find().populate(
    "createdBy",
    "_id name"
  );
  res.status(201).json({
    categories,
  });
});

router.get("/category/:id", async (req, res) => {
  const category = await CategoryModel.findById(req.params.id).populate(
    "createdBy",
    "_id name"
  );
  res.status(201).json({ category });
});

router.post(
  "/category/create",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    const { _id, name, slug, image, createdAt } = req.body;
    if (!name || !slug || !image) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    const category = await CategoryModel.create({
      _id,
      name,
      slug,
      image,
      createdAt,
      createdBy: req.user,
    });
    try {
      await category.save();
      res.status(200).json({
        category,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.put(
  "/category/update/:id",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    try {
      const { name, slug, image } = req.body;
      const updatedBanner = await CategoryModel.findByIdAndUpdate(
        req.params.id,
        {
          name,
          slug,
          image,
        }
      );
      res.status(200).json({ updatedCategory });
    } catch (err) {
      console.log(err);
    }
  }
);

router.delete(
  "/category/delete/:id",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    await CategoryModel.findByIdAndDelete(req.params.id);
    res.status(201).json({
      msg: "DELETED",
    });
  }
);

module.exports = router;
