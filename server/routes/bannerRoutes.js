const { Router } = require("express");
const {
  getAllBanners,
  getBanner,
  createBanner,
  updateBanner,
  deleteBanner,
  deleteSelected,
} = require("../controllers/bannerController");
const authAdminMiddleware = require("../middleware/authAdminMiddleware");
const authMiddleware = require("../middleware/authMiddleware");
const router = Router();

// path - /banner
router.get("/", getAllBanners);
router.get("/:id", getBanner);
// admin only
router.post("/", authMiddleware, authAdminMiddleware, createBanner);
router.put("/:id", authMiddleware, authAdminMiddleware, updateBanner);
router.delete("/:id", authMiddleware, authAdminMiddleware, deleteBanner);
router.post("/selected", authMiddleware, authAdminMiddleware, deleteSelected);

module.exports = router;
