const { Router } = require("express");
const {
  getAllBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  deleteSelected
} = require("../controllers/bannerController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

router.get("/banners", getAllBanners);
router.get("/banner/:id", getBanner);
router.post("/banner", authMiddleware, authAdminMiddleware, createBanner);
router.put("/banner/:id", authMiddleware, authAdminMiddleware, updateBanner);
router.delete("/banner/:id", authMiddleware, authAdminMiddleware, deleteBanner);
router.post("/banner/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
