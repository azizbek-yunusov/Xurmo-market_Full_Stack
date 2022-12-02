const { Router } = require("express");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const BannerModel = require("../models/BannerModel");
const router = Router();

router.get("/banners", async (req, res) => {
  const banners = await BannerModel.find().populate("createdBy", "_id name");
  res.status(201).json({
    banners,
  });
});

router.get("/banner/:id", async (req, res) => {
  const banner = await BannerModel.findById(req.params.id).populate(
    "createdBy",
    "_id name"
  );
  res.status(201).json({ banner });
});

router.post(
  "/banner/create",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    const { _id, name, href, image, createdAt } = req.body;
    if (!name || !href || !image) {
      return res.status(400).json({ error: "Please add all the feilds" });
    }
    const banner = await BannerModel.create({
      _id,
      name,
      href,
      image,
      createdAt,
      createdBy: req.user,
    });
    try {
      await banner.save();
      res.status(200).json({
        banner,
      });
    } catch (err) {
      console.log(err);
    }
  }
);

router.put(
  "/banner/update/:id",
  authMiddleware,
  authAdminMiddleware,
  async (req, res) => {
    try {
      const { name, href, image } = req.body;
      const updatedBanner = await BannerModel.findByIdAndUpdate(req.params.id, {
        name,
        href,
        image,
      });
      res.status(200).json({ updatedBanner });
    } catch (err) {
      console.log(err);
    }
  }
);

router.delete("/banner/delete/:id", authMiddleware, authAdminMiddleware, async (req, res) => {
  await BannerModel.findByIdAndDelete(req.params.id);
  res.status(201).json({
    msg: "DELETED",
  });
});

module.exports = router;
